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

const LoginPage = () => {
  const navigation = useNavigation();
  const [secureText, setSecureText] = useState(false);

  const {theme} = useTheme();
  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };

  const LoginHandler = () => {
    navigation.navigate('Home');
  };

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
              {backgroundColor: theme === 'dark' ? '#333' : '#fff'}, // Background based on theme
            ]}
            label={'Email Address'}
            placeholder="Enter your email"
            placeholderTextColor={placeholderColor} // Set placeholder text color
            theme={{
              colors: {
                primary: '#3085fe', // Border color
                placeholder: placeholderColor, // Placeholder color
              },
            }}
            labelStyle={{color: textColor}} // Label color
            textColor={textColor} // Explicitly setting text color
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: theme === 'dark' ? '#333' : '#fff'}, // Background based on theme
              ]}
              label="Password"
              placeholder="Enter your password"
              placeholderTextColor={placeholderColor} // Set placeholder text color
              secureTextEntry={secureText}
              theme={{
                colors: {
                  primary: '#3085fe', // Border color
                  placeholder: placeholderColor, // Placeholder color
                },
              }}
              labelStyle={{color: textColor}} // Label color
              textColor={textColor} // Explicitly setting text color
            />
            {/* Eye icon outside of TextInput */}
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
              <Text style={{color: textColor}}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/social/facebook.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{color: textColor}}>Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomText}>
            <Text
              style={[
                {color: textColor},
                {fontSize: hp(1.5), textAlign: 'center'},
              ]}>
              Didn't have an account?{' '}
              <Text
                style={{color: '#3085fe'}}
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
  welcomeText: {fontSize: hp(3.5), fontWeight: 'bold'},
  secondText: {marginTop: hp(1), fontSize: hp(2), color: '#acafb5'},
  formContainer: {
    flex: 1,
    marginTop: hp(3),
    flexDirection: 'column',
    gap: hp(2),
  },
  input: {
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
  },
  socialText: {
    textAlign: 'center',
    color: '#acafb5',
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
  },
});
