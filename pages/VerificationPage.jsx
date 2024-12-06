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
import {EnvelopeIcon, PhoneIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {OtpInput} from 'react-native-otp-entry';
import {useNavigation} from '@react-navigation/native';
const VerificationPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [checked, setChecked] = React.useState('first');
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <KeyboardAvoidingView
      style={[
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
                // onTextChange={text => console.log(text)}
                onFilled={text => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  containerStyle: {},
                  pinCodeContainerStyle: {
                    width: wp(20),
                    height: wp(20),
                    borderRadius: 0,
                  },
                  pinCodeTextStyle: {color: '#3085fe'},
                  focusStickStyle: {},
                  focusedPinCodeContainerStyle: {},
                }}
              />
              <View style={styles.resendText}>
                <Text style={{fontSize: hp(2), color: textColor}}>00:30 </Text>
                <TouchableOpacity>
                  <Text style={{color: '#3085fe', fontSize: hp(2)}}>
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
    </KeyboardAvoidingView>
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
  heading: {fontSize: hp(3), fontWeight: 'bold'},
  subText: {fontSize: wp(4), color: '#9ca7ba'},
  imageContainer: {marginVertical: hp(4)},
  image: {width: 300, height: 300},
  otpContainer: {gap: 10},

  verifyBtn: {
    marginVertical: hp(4),
    justifyContent: 'center',
    backgroundColor: '#3085fe',
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: hp(2),
    color: 'white',
    fontSize: hp(2),
  },
  resendText: {
    marginTop: hp(2),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
});
