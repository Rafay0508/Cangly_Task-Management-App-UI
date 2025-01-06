// import React, {createContext, useContext, useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import database from '@react-native-firebase/database';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [userDetails, setUserDetails] = useState(null); // New state for user details
//   const [signinMethod, setSigninMethod] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const saveUserToStorage = async userDetails => {
//     try {
//       await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
//     } catch (error) {
//       console.error('Error saving user details to storage:', error);
//     }
//   };
//   const removeFromStorage = async () => {
//     try {
//       await AsyncStorage.removeItem('userDetails');
//     } catch (error) {
//       console.error('Error removing user details to storage:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const storedDetails = await AsyncStorage.getItem('userDetails');
//       if (storedDetails) {
//         setUserDetails(JSON.parse(storedDetails));
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '538825766481-e74doh2qha5o0ttk3f4m28kb7lgfmk8c.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//   }, []);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(async currentUser => {
//       setLoading(true);

//       if (currentUser) {
//         // Fetch user details from Firestore
//         database()
//           .ref(`/users/${currentUser.uid}`)
//           .once('value')
//           .then(snapshot => {
//             setUserDetails(snapshot.val());
//             saveUserToStorage(snapshot.val());
//           });
//       } else {
//         saveUserToStorage(null); // Reset user details when logged out
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signUp = async (fname, sname, email, password) => {
//     const defaultPhoto = 'https://shorturl.at/UD9Ft';
//     const fullName = `${fname} ${sname}`;
//     setLoading(true);
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(
//         email,
//         password,
//       );

//       // Set user data in Realtime Database
//       await database().ref(`users/${userCredential.user.uid}`).set({
//         uid: userCredential.user.uid,
//         fullName: fullName,
//         email: userCredential.user.email,
//         photoURL: defaultPhoto,
//         createdAt: database.ServerValue.TIMESTAMP,
//       });

//       // Fetch user data (could be in a separate effect or function)
//       await database()
//         .ref(`users/${userCredential.user.uid}`)
//         .once('value', snapshot => {
//           if (snapshot.exists()) {
//             saveUserToStorage(snapshot.val());
//           } else {
//             console.log('No user data available for this UID');
//           }
//         });
//     } catch (error) {
//       console.error('Sign up error:', error.message);
//       throw new Error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     console.log(email, password);
//     setLoading(true);
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(
//         email,
//         password,
//       );
//       setSigninMethod('emailPassword');

//       await database()
//         .ref(`users/${userCredential.user.uid}`)
//         .once('value', snapshot => {
//           if (snapshot.exists()) {
//             saveUserToStorage(snapshot.val());
//           } else {
//             console.log('No user data available for this UID');
//           }
//         });
//     } catch (error) {
//       console.error('Login error:', error.message);
//       throw new Error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logOut = async () => {
//     console.log('Current signinMethod before logout:', signinMethod);
//     setLoading(true);
//     try {
//       if (signinMethod === 'google') {
//         await GoogleSignin.revokeAccess();
//         await GoogleSignin.signOut();
//         removeFromStorage();
//       } else {
//         await auth().signOut();
//         removeFromStorage();
//       }
//       setUserDetails(null); // Reset user details
//       setSigninMethod(null);
//       console.log('User logged out successfully');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (response) {
//         setSigninMethod('google');
//         setUser(response.user);
//         setUserDetails(response.user); // Save user details
//       } else {
//         console.log('Sign-in was cancelled');
//       }
//     } catch (error) {
//       console.log('Google Sign-in error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         userDetails,
//         signInWithGoogle,
//         login,
//         signUp,
//         logOut,
//         loading,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
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
