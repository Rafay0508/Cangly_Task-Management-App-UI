import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../context/ThemeContext';
import {OtpInput} from 'react-native-otp-entry';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
const VerificationPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <ScrollView
      contentContainerStyle={[
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
        styles.container,
      ]}>
      <TouchableWithoutFeedback>
        <ScrollView>
          <View style={styles.backNavigateBtn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <ChevronLeftIcon size={hp(4)} color={textColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <Text style={[styles.heading, {color: textColor}]}>
                Enter Verification Code
              </Text>
              <Text style={styles.subText}>
                We Have sent the code verification to your mobile number
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/verification-code.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.otpContainer}>
              <OtpInput
                numberOfDigits={4}
                focusStickBlinkingDuration={500}
                onFilled={text => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  containerStyle: {},
                  pinCodeContainerStyle: {
                    width: wp(20),
                    height: wp(17),
                    borderRadius: 0,
                  },
                  pinCodeTextStyle: {color: Color.firstColor},
                  focusStickStyle: {},
                  focusedPinCodeContainerStyle: {},
                }}
              />
              <View style={styles.resendText}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: Fonts.regular,
                    color: textColor,
                  }}>
                  00:30{' '}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: Color.firstColor,
                      fontSize: hp(2),
                      fontFamily: Fonts.regular,
                    }}>
                    Resend it
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={() => navigation.navigate('NewPassword')}>
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default VerificationPage;

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
  subText: {fontSize: wp(4), color: '#9ca7ba', fontFamily: Fonts.regular},
  imageContainer: {
    marginVertical: hp(2),
    width: '100%',
    height: '100%',
  },
  image: {width: '100%', height: '100%', objectFit: 'contain'},
  otpContainer: {marginVertical: hp(1), gap: 10},

  verifyBtn: {
    marginVertical: hp(4),
    justifyContent: 'center',
    backgroundColor: Color.firstColor,
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: hp(2),
    color: 'white',
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
  resendText: {
    marginTop: hp(1),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
});
