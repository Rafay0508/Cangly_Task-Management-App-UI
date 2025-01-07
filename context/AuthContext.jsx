import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [signinMethod, setSigninMethod] = useState(null);

  const saveUserToStorage = async userDetails => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
    } catch (error) {
      console.error('Error saving user details to storage:', error);
    }
  };

  const removeFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
    } catch (error) {
      console.error('Error removing user details from storage:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const storedDetails = await AsyncStorage.getItem('userDetails');
      if (storedDetails) {
        const parsedDetails = JSON.parse(storedDetails);
        setUserDetails(parsedDetails);
        setLoading(false); // Set loading to false when data is fetched
      } else {
        setLoading(false); // If no user details found, still set loading to false
      }
    } catch (error) {
      console.error('Error fetching user details from storage:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        try {
          const snapshot = await database()
            .ref(`/users/${currentUser.uid}`)
            .once('value');
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserDetails(userData);
            await saveUserToStorage(userData); // Save to AsyncStorage
          } else {
            console.log('No user data available for this UID');
          }
        } catch (error) {
          console.error('Error fetching user details from database:', error);
        }
      } else {
        setUserDetails(null);
        await removeFromStorage(); // Remove user details from AsyncStorage if logged out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setSigninMethod('emailPassword');
      const snapshot = await database()
        .ref(`users/${userCredential.user.uid}`)
        .once('value');
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserDetails(userData);
        await saveUserToStorage(userData);
      } else {
        console.log('No user data available for this UID');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await auth().signOut();
      setUserDetails(null); // Clear user details from state
      await removeFromStorage(); // Remove user details from AsyncStorage
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // social login

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '538825766481-e74doh2qha5o0ttk3f4m28kb7lgfmk8c.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      setSigninMethod('google');
      const snapshot = await database()
        .ref(`users/${response.user.uid}`)
        .once('value');
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserDetails(userData);
        await saveUserToStorage(userData);
      } else {
        console.log('No user data available for this UID');
      }
    } catch (error) {
      console.log('Google Sign-in error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{login, logOut, loginWithGoogle, userDetails, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
