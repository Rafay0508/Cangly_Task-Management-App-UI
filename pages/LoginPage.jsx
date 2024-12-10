import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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

const LoginPage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(false);

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };
  const LoginHandler = () => {
    console.log(email, password);
    setEmail('');
    setPassword('');
    navigation.navigate('HomePage');
  };

  // theme Toggle
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e'; // Placeholder color based on theme

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
            to <Text style={{color: '#3085fe'}}>CANGLY</Text>
          </Text>
          <Text style={styles.secondText}>Hello there, login to continue</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
            ]}
            label={'Email Address'}
            placeholder="Enter your email"
            placeholderTextColor={placeholderColor}
            theme={{
              colors: {
                primary: '#3085fe',
                placeholder: placeholderColor,
              },
            }}
            labelStyle={{color: textColor}}
            textColor={textColor}
            value={email}
            onChangeText={text => setEmail(text)}
          />
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
                colors: {
                  primary: '#3085fe',
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
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={{textAlign: 'right', color: '#3085fe'}}>
              Forget Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={LoginHandler}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.socialText}>Or continue with social account</Text>
          <View style={styles.socialButtonContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/social/google.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: textColor, fontFamily: Fonts.regular}}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/social/facebook.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: textColor, fontFamily: Fonts.regular}}>
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomText}>
            <Text
              style={[
                {color: textColor},
                {
                  fontSize: hp(1.5),
                  textAlign: 'center',
                  fontFamily: Fonts.regular,
                },
              ]}>
              Didn't have an account?{' '}
              <Text
                style={{color: '#3085fe', fontFamily: Fonts.regular}}
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
    fontFamily: Fonts.subHeading,
  },
  formContainer: {
    flex: 1,
    marginTop: hp(3),
    flexDirection: 'column',
    gap: hp(2),
  },
  input: {
    fontFamily: Fonts.regular,
    borderWidth: 2,
    borderColor: '#3085fe',
    backgroundColor: 'transparent', // Default transparent background to allow for theme adjustment
  },
  passwordContainer: {
    position: 'relative', // Ensure the icon is placed absolutely in relation to this container
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15, // Adjust the position of the icon within the input
  },
  button: {
    backgroundColor: '#3085fe',
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
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
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp(2),
  },
  socialButton: {
    flexDirection: 'row',
    gap: wp(4),
    paddingHorizontal: wp(10),
    borderWidth: 1,
    borderColor: '#e6eaf2',
    padding: hp(2),
    borderRadius: 10,
  },
  bottomText: {
    marginTop: hp(8),
    width: '100%',
    fontFamily: Fonts.regular,
  },
});
