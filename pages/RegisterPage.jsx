import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../context/ThemeContext';
import {TextInput} from 'react-native-paper';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import {useAuth} from '../context/AuthContext';

const RegisterPage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {Register, signupWithGoogle} = useAuth();

  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmCondition, setConfirmCondition] = useState(false);
  const [secureText, setSecureText] = useState(false);

  // Refs to manage focus between fields
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Toggle for password visibility
  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };

  // Handle checkbox toggle
  const handleCheckBoxToggle = () => {
    setConfirmCondition(prevChecked => !prevChecked);
  };

  // Register handler
  const registerHandler = async () => {
    if (fname && sname && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Error', "Passwords don't match!");
        return;
      }

      if (!confirmCondition) {
        Alert.alert('Warning!', 'You must agree to the terms and conditions');
        return;
      }

      try {
        await Register(fname, sname, email, password);
        Alert.alert('SignUp Successful');
      } catch (error) {
        if (error.message.slice(0, 27) === '[auth/email-already-in-use]') {
          Alert.alert(
            'SignUp Failed',
            error.message.slice(28, error.message.length),
          );
        } else {
          Alert.alert(
            'SignUp Failed',
            error.message.slice(21, error.message.length),
          );
        }
      }
    } else {
      Alert.alert('SignUp Failed', 'All Fields Are Required');
    }
    setFname('');
    setSname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSigninWithGoogle = async () => {
    if (confirmCondition) {
      try {
        await signupWithGoogle();
        Alert.alert('Login Successful', 'Welcome back!');
      } catch (error) {
        Alert.alert('SignIn Error', error.message);
      }
    } else {
      Alert.alert('Warning!', 'You must agree to the terms and conditions');
    }
  };

  const textColor = theme === 'dark' ? 'white' : 'black';
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e';
  return (
    <ScrollView
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
            Register Account
          </Text>
          <Text style={[{color: textColor}, styles.welcomeText]}>
            to <Text style={{color: Color.firstColor}}>CANGLY</Text>
          </Text>
          <Text style={styles.secondText}>
            Hello there, register to continue
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            ref={firstNameInputRef} // Ref for first name field
            style={[
              styles.input,
              {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
            ]}
            label={'First Name'}
            placeholder="Enter First Name"
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
            value={fname}
            onChangeText={setFname}
            returnKeyType="next"
            onSubmitEditing={() => lastNameInputRef.current.focus()}
          />

          <TextInput
            ref={lastNameInputRef} // Ref for last name field
            style={[
              styles.input,
              {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
            ]}
            label={'Last Name'}
            placeholder="Enter Last Name"
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
            value={sname}
            onChangeText={setSname}
            returnKeyType="next"
            onSubmitEditing={() => emailInputRef.current.focus()}
          />

          <TextInput
            ref={emailInputRef} // Ref for email field
            style={[
              styles.input,
              {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
            ]}
            label={'Email Address'}
            placeholder="Enter Email Address"
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
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              ref={passwordInputRef} // Ref for password field
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
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
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

          <View style={styles.passwordContainer}>
            <TextInput
              ref={confirmPasswordInputRef} // Ref for confirm password field
              style={[
                styles.input,
                {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
              ]}
              label="Confirm Password"
              placeholder="Confirm password"
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              returnKeyType="done"
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

          <View style={{flexDirection: 'row', gap: hp(1.5)}}>
            <CheckBox
              checkBoxColor={Color.firstColor}
              onClick={handleCheckBoxToggle}
              isChecked={confirmCondition}
            />
            <Text
              style={{
                color: textColor,
                fontSize: hp(1.7),
                width: '80%',
                textAlign: 'left',
                fontFamily: Fonts.regular,
              }}>
              I agree to the
              <Text style={{color: Color.firstColor}}>
                Term & Condition & Privacy Policy
              </Text>
              set out by this site.
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>Register</Text>
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
                {fontSize: hp(2), textAlign: 'center'},
              ]}>
              Already have an account?{' '}
              <Text
                style={{color: Color.firstColor}}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp('20%'),
    height: hp('10%'),
    margin: hp('3%'),
    marginVertical: hp('1%'),
  },
  subContainer: {
    flex: 1,
    marginHorizontal: wp(3),
  },
  textContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: hp(3.5),
    fontFamily: Fonts.subHeading,
  },
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
    borderWidth: 2,
    borderColor: Color.firstColor,
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
    marginBottom: hp(3),
    width: '100%',
    fontFamily: Fonts.regular,
  },
});
