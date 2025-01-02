import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
  const {user, signUp, signInWithGoogle} = useAuth();
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmCondition, setConfirmCondition] = useState(false);
  const [secureText, setSecureText] = useState(false);

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };

  const handleCheckBoxToggle = () => {
    setConfirmCondition(prevChecked => !prevChecked);
  };

  const registerHandler = async () => {
    if ((fname, sname, email, password, confirmPassword)) {
      if (password !== confirmPassword) {
        Alert.alert('Error', "Passwords don't match!");
        return;
      }

      if (!confirmCondition) {
        Alert.alert('Warning!', 'You must agree to the terms and conditions');
        return;
      }
      try {
        await signUp(fname, sname, email, password);
        navigation.navigate('Login');
        Alert.alert('signup successfull');
      } catch (error) {
        if (error.message.slice(0, 27) === '[auth/email-already-in-use]') {
          Alert.alert(
            'SignUp Failed',
            error.message.slice(28, error.message.length),
          );
        } else {
          Alert.alert(
            'Login Failed',
            error.message.slice(21, error.message.length),
          );
        }
      }
    } else {
      Alert.alert('Login Failed', 'All Field Required');
    }

    // Clear inputs after registration
    setFname('');
    setSname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSigninWithGoogle = async () => {
    if (confirmCondition) {
      try {
        await signInWithGoogle();

        if (user) {
          Alert.alert('Login Successful', 'Welcome back!');
        }
        navigation.navigate('HomePage');
      } catch (error) {
        Alert.alert('SiginError', error.message);
      }
    } else {
      Alert.alert('Warning!', 'You must agree to the terms and conditions');
    }
  };

  // theme toggle
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e'; // Placeholder color based on theme

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
            onChangeText={text => setFname(text)}
          />
          <TextInput
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
            onChangeText={text => setSname(text)}
          />
          <TextInput
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
          <View style={styles.passwordContainer}>
            <TextInput
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
              onChangeText={text => setConfirmPassword(text)}
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
          <View style={{flexDirection: 'row', gap: hp(1.5)}}>
            <CheckBox
              checkBoxColor={Color.firstColor}
              onClick={handleCheckBoxToggle} // Correctly bind the checkbox toggle
              isChecked={confirmCondition} // Bind the checkbox state
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
