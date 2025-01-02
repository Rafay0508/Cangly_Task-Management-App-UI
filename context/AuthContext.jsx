// import React, {createContext, useContext, useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import firestore from '@react-native-firebase/firestore'; // Correct import for firestore

// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(null);
//   const [signinMethod, setSigninMethod] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // console.log('Auth context loaded');
//     GoogleSignin.configure({
//       webClientId:
//         '538825766481-e74doh2qha5o0ttk3f4m28kb7lgfmk8c.apps.googleusercontent.com',
//       offlineAccess: true,
//     });
//   }, []);

//   // useEffect(() => {
//   //   console.log('signinMethod changed to:', signinMethod);
//   // }, [signinMethod]);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(currentUser => {
//       // console.log('User state changed:', currentUser);
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (response) {
//         console.log('Google Sign-in successful:', response.user);
//         setSigninMethod('google'); // Set the signin method to 'google'
//         setUser(response.user); // Set user data
//       } else {
//         console.log('Sign-in was cancelled');
//       }
//     } catch (error) {
//       console.log('Google Sign-in error:', error);
//     }
//   };

//   const signUp = async (fname, sname, email, password) => {
//     const defaultPhoto = 'https://shorturl.at/UD9Ft';
//     const fullName = `${fname} ${sname}`;
//     setLoading(true);
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(
//         email,
//         password,
//       );

//       // Store user in Firestore
//       const userRef = firestore()
//         .collection('users') // Make sure 'users' is the correct collection name
//         .doc(userCredential.user.uid);
//       await userRef.set({
//         email: email,
//         fullName: fullName,
//         photoURL: defaultPhoto,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//     } catch (error) {
//       console.error('Sign up error:', error.message);
//       throw new Error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(
//         email,
//         password,
//       );
//       setSigninMethod('emailPassword'); // Set the signin method to 'emailPassword'
//       setUser(userCredential.user);
//       return userCredential.user;
//     } catch (error) {
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
//       } else {
//         await auth().signOut();
//       }
//       setUser(null);
//       setSigninMethod(null); // Reset signin method on logout
//       console.log('User logged out successfully');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{user, signInWithGoogle, login, signUp, logOut, loading}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {useUsersData} from './UsersData';
import database from '@react-native-firebase/database';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // New state for user details
  const [signinMethod, setSigninMethod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '538825766481-e74doh2qha5o0ttk3f4m28kb7lgfmk8c.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setLoading(true);

      if (currentUser) {
        // Fetch user details from Firestore
        database()
          .ref(`/users/${currentUser.uid}`)
          .once('value')
          .then(snapshot => {
            setUser(snapshot.val());
            setUserDetails(snapshot.val());
          });
      } else {
        setUserDetails(null); // Reset user details when logged out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (fname, sname, email, password) => {
    const defaultPhoto = 'https://shorturl.at/UD9Ft';
    const fullName = `${fname} ${sname}`;
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Set user data in Realtime Database
      await database().ref(`users/${userCredential.user.uid}`).set({
        uid: userCredential.user.uid,
        fullName: fullName,
        email: userCredential.user.email,
        photoURL: defaultPhoto,
        createdAt: database.ServerValue.TIMESTAMP,
      });

      // Fetch user data (could be in a separate effect or function)
      await database()
        .ref(`users/${userCredential.user.uid}`)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
            setUserDetails(snapshot.val());
          } else {
            console.log('No user data available for this UID');
          }
        });
    } catch (error) {
      console.error('Sign up error:', error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setSigninMethod('emailPassword');

      await database()
        .ref(`users/${userCredential.user.uid}`)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            setUser(snapshot.val());
            setUserDetails(snapshot.val());
          } else {
            console.log('No user data available for this UID');
          }
        });
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    console.log('Current signinMethod before logout:', signinMethod);
    setLoading(true);
    try {
      if (signinMethod === 'google') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } else {
        await auth().signOut();
      }
      setUser(null);
      setUserDetails(null); // Reset user details
      setSigninMethod(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response) {
        setSigninMethod('google');
        setUser(response.user);
        setUserDetails(response.user); // Save user details
      } else {
        console.log('Sign-in was cancelled');
      }
    } catch (error) {
      console.log('Google Sign-in error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails, // Provide user details
        signInWithGoogle,
        login,
        signUp,
        logOut,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
