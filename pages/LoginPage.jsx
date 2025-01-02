import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../context/ThemeContext';
import {TextInput} from 'react-native-paper';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import {useAuth} from '../context/AuthContext';

const LoginPage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {user, signInWithGoogle, login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState();

  // theme Toggle
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e'; // Placeholder color based on theme

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const validateForm = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password length not Valid');
      return false;
    }
    return true;
  };
  useEffect(() => {
    setEmailError('');
    setPasswordError('');
  }, [email, password]);

  const loginHandler = async () => {
    if (!validateForm()) return;
    try {
      await login(email, password);

      Alert.alert('Login Successful', 'Welcome back!');
      // navigation.navigate('HomePage');
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid Credentials. Please tryAgain');
    }
  };

  const handleSigninWithGoogle = async () => {
    try {
      await signInWithGoogle();

      if (user) {
        Alert.alert('Login Successful', 'Welcome back!');
      }
      navigation.navigate('HomePage');
    } catch (error) {
      Alert.alert('SiginError', error.message);
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <Image source={require('../assets/logo-blue.png')} style={styles.image} />
      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={[{color: textColor}, styles.welcomeText]}>
            Welcome Back 👋
          </Text>
          <Text style={[{color: textColor}, styles.welcomeText]}>
            to <Text style={{color: Color.firstColor}}>CANGLY</Text>
          </Text>
          <Text style={styles.secondText}>Hello there, login to continue</Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
              ]}
              label={'Email Address'}
              placeholder="Enter your email"
              placeholderTextColor={placeholderColor}
              theme={{
                roundness: 0,
                colors: {
                  primary: Color.firstColor,
                  placeholder: placeholderColor,
                },
              }}
              labelStyle={{color: textColor}}
              textColor={textColor}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : ''}
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
              ]}
              label="Password"
              placeholder="Enter your password"
              placeholderTextColor={placeholderColor}
              secureTextEntry={secureText}
              theme={{
                roundness: 0,
                colors: {
                  primary: Color.firstColor,
                  placeholder: placeholderColor,
                },
              }}
              labelStyle={{color: textColor}}
              textColor={textColor}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={toggleSecureText}
              style={styles.eyeIconContainer}>
              {secureText ? (
                <EyeSlashIcon color={textColor} />
              ) : (
                <EyeIcon color={textColor} />
              )}
            </TouchableOpacity>
            {passwordError ? (
              <Text style={{color: 'red'}}>{passwordError}</Text>
            ) : (
              ''
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text
              style={{
                textAlign: 'right',
                fontSize: wp(4),
                color: Color.firstColor,
              }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.socialText}>Or continue with social account</Text>
          <View style={styles.socialButtonContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSigninWithGoogle}>
              <Image
                source={require('../assets/social/google.png')}
                style={{width: 20, height: 20}}
              />
              <Text
                style={{
                  color: textColor,
                  fontSize: wp(4),
                  fontFamily: Fonts.regular,
                }}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/social/facebook.png')}
                style={{width: 20, height: 20}}
              />
              <Text
                style={{
                  color: textColor,
                  fontSize: wp(4),
                  fontFamily: Fonts.regular,
                }}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomText}>
            <Text
              style={[
                {color: textColor},
                {
                  fontSize: hp(2),
                  textAlign: 'center',
                  fontFamily: Fonts.regular,
                },
              ]}>
              Didn't have an account?{' '}
              <Text
                style={{color: Color.firstColor, fontFamily: Fonts.regular}}
                onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp('20%'),
    height: hp('10%'),
    margin: hp('3%'),
  },
  subContainer: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  textContainer: {
    flexDirection: 'column',
  },
  welcomeText: {fontSize: hp(3.5), fontFamily: Fonts.subHeading},
  secondText: {
    marginTop: hp(1),
    fontSize: hp(2),
    color: '#acafb5',
    fontFamily: Fonts.regular,
  },
  formContainer: {
    flex: 1,
    marginTop: hp(3),
    flexDirection: 'column',
    gap: hp(2),
  },
  input: {
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Color.firstColor,
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  button: {
    backgroundColor: Color.firstColor,
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  buttonText: {
    fontSize: hp(2),
    color: 'white',
    fontFamily: Fonts.regular,
  },
  socialText: {
    textAlign: 'center',
    color: '#acafb5',
    fontFamily: Fonts.regular,
    fontSize: wp(4),
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(2),
  },
  socialButton: {
    flexDirection: 'row',
    gap: wp(4),
    paddingHorizontal: wp(8),
    borderWidth: 1,
    borderColor: '#e6eaf2',
    padding: hp(2),
    borderRadius: 10,
  },
  bottomText: {
    marginTop: hp(2),
    width: '100%',
    fontFamily: Fonts.regular,
  },
});
