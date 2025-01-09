import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

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
      await AsyncStorage.setItem('signinMethod', 'emailPassword');
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

  const Register = async (fname, sname, email, password) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await AsyncStorage.setItem('signinMethod', 'emailPassword');
      const snapshot = await database()
        .ref(`users/${userCredential.user.uid}`)
        .set({
          createdAt: Date.now(),
          email: userCredential.user.email,
          fullName: fname + ' ' + sname,
          photoURL: 'https://shorturl.at/UD9Ft',
          uid: userCredential.user.uid,
        });
      if (snapshot) {
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
    const signinMethod = await AsyncStorage.getItem('signinMethod');
    try {
      if (signinMethod === 'emailPassword') {
        await auth().signOut();
      } else if (signinMethod === 'google') {
        await auth().signOut();
        await GoogleSignin.signOut();
      }
      await AsyncStorage.removeItem('signinMethod');
      setUserDetails(null);
      await removeFromStorage();
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

  const editProfile = async (fullName, photoURL) => {
    try {
      const user = auth().currentUser;

      await database().ref(`/users/${user.uid}`).update({
        photoURL,
        fullName,
      });

      const updatedUserDetails = {
        ...userDetails,
        fullName,
        photoURL,
      };
      setUserDetails(updatedUserDetails);

      await saveUserToStorage(updatedUserDetails);

      console.log('Profile updated successfully.');
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        Register,
        logOut,
        loginWithGoogle,
        userDetails,
        loading,
        editProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
