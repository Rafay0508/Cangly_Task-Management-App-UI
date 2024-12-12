import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {EnvelopeIcon, PhoneIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
const ForgetPasswordPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [checked, setChecked] = React.useState('first');
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <View
      style={[
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
        styles.container,
      ]}>
      <View style={styles.backNavigateBtn}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <ChevronLeftIcon size={hp(4)} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.heading, {color: textColor}]}>
              Forget Password 🤔
            </Text>
            <Text style={styles.subText}>
              Select which contact details should we use to reset your password
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/forgot-password.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.radioContainer}>
            <View style={styles.emailRadio}>
              <View
                style={[
                  styles.emailIcon,
                  checked === 'first'
                    ? {backgroundColor: Color.firstColor}
                    : {},
                ]}>
                <EnvelopeIcon
                  size={hp(3)}
                  color={checked === 'first' ? 'white' : 'black'}
                />
              </View>
              <View style={{gap: 4, width: '55%'}}>
                <Text
                  style={[
                    {fontSize: 18, fontFamily: Fonts.subHeading},
                    {color: textColor},
                  ]}>
                  Email
                </Text>
                <Text
                  style={[
                    {fontSize: 14, fontFamily: Fonts.regular},
                    {color: textColor},
                  ]}>
                  Mike Harley@gmail.com
                </Text>
              </View>
              <View>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                  color={Color.firstColor}
                />
              </View>
            </View>
            <View style={styles.phoneRadio}>
              <View
                style={[
                  styles.emailIcon,
                  checked === 'second'
                    ? {backgroundColor: Color.firstColor}
                    : {},
                ]}>
                <PhoneIcon
                  size={hp(3)}
                  color={checked === 'second' ? 'white' : 'black'}
                />
              </View>
              <View style={{gap: 4, width: '55%'}}>
                <Text
                  style={[
                    {fontSize: 16, fontFamily: Fonts.subHeading},
                    {color: textColor},
                  ]}>
                  Phone Number
                </Text>
                <Text
                  style={[
                    {fontSize: 14, fontFamily: Fonts.regular},
                    {color: textColor},
                  ]}>
                  +689 548 89565
                </Text>
              </View>
              <View>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                  color={Color.firstColor}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('Verification')}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPasswordPage;

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
  subText: {fontSize: wp(4), color: '#9ca7ba', fontFamily: Fonts.heading},
  imageContainer: {marginVertical: hp(4)},
  image: {width: 300, height: 300},
  radioContainer: {gap: 10},
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
  continueBtn: {
    marginVertical: 20,
    justifyContent: 'center',
    backgroundColor: Color.firstColor,
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: hp(2),
    color: 'white',
    fontSize: hp(2),
    fontFamily: Fonts.subHeading,
  },
});
