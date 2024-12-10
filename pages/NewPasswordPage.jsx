import {
  Image,
  KeyboardAvoidingView,
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
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import {TextInput} from 'react-native-paper';
import {Fonts} from '../utils/fonts';

const NewPasswordPage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(false);

  const updateHandler = () => {
    console.log(password, confirmPassword);
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('Login');
  };

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };

  // theme Toggle
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e'; // Placeholder color based on theme
  return (
    <KeyboardAvoidingView
      style={[
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
        styles.container,
      ]}>
      <ScrollView>
        <View style={styles.backNavigateBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Verification')}>
            <ChevronLeftIcon size={hp(4)} color={textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.heading, {color: textColor}]}>
              Enter New Password
            </Text>
            <Text style={styles.subText}>Please enter your new password</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/new-password.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.passwordsContainer}>
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
                  colors: {
                    primary: '#3085fe',
                    placeholder: placeholderColor,
                  },
                }}
                labelStyle={{color: textColor}}
                textColor={textColor}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
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
          </View>
          <TouchableOpacity style={styles.updateBtn} onPress={updateHandler}>
            <Text style={styles.btnText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPasswordPage;

const styles = StyleSheet.create({
  container: {flex: 1},
  backNavigateBtn: {
    height: hp(8),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  subContainer: {flex: 1, padding: hp(2)},
  textContainer: {gap: 10},
  heading: {fontSize: hp(3), fontFamily: Fonts.heading},
  subText: {fontSize: wp(4), color: '#9ca7ba', fontFamily: Fonts.subHeading},
  imageContainer: {marginVertical: hp(4)},
  image: {width: 300, height: 300},
  input: {fontFamily: Fonts.regular},
  passwordsContainer: {gap: hp(2)},
  emailRadio: {
    padding: hp(2),
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: '#d0d0e0',
  },
  emailIcon: {backgroundColor: '#f7f7f8', padding: wp(3)},
  phoneRadio: {
    padding: hp(2),
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: '#d0d0e0',
  },
  updateBtn: {
    marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#3085fe',
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: hp(2),
    color: 'white',
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
  passwordContainer: {
    position: 'relative', // Ensure the icon is placed absolutely in relation to this container
    borderWidth: 1,
    borderColor: '#3085fe',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 15, // Adjust the position of the icon within the input
  },
});
