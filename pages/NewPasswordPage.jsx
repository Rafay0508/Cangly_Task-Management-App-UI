import {
  Image,
  KeyboardAvoidingView,
  Modal,
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
import {Color} from '../utils/colors';

const NewPasswordPage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const updateHandler = () => {
    setPassword('');
    setConfirmPassword('');
    setModalVisible(true);
  };

  const toggleSecureText = () => {
    setSecureText(prevState => !prevState);
  };

  const textColor = theme === 'dark' ? 'white' : 'black';
  const placeholderColor = theme === 'dark' ? '#d3d3d3' : '#8e8e8e';

  return (
    <KeyboardAvoidingView
      style={[
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
        styles.container,
      ]}>
      <View style={{flex: 1, opacity: modalVisible ? 0.5 : 1}}>
        <ScrollView>
          <View style={styles.backNavigateBtn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Verification')}>
              <ChevronLeftIcon size={hp(4)} color={textColor} />
            </TouchableOpacity>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.textContainer}>
              <Text style={[styles.heading, {color: textColor}]}>
                Enter New Password
              </Text>
              <Text style={[styles.subText, {color: placeholderColor}]}>
                Please enter your new password
              </Text>
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
                  label="Enter New Password"
                  placeholder="Enter New Password"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry={secureText}
                  theme={{
                    colors: {
                      primary: Color.firstColor,
                      placeholder: placeholderColor,
                    },
                  }}
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
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
                  ]}
                  label="Re-Enter Password"
                  placeholder="Re-Enter Password"
                  placeholderTextColor={placeholderColor}
                  secureTextEntry={secureText}
                  theme={{
                    colors: {
                      primary: Color.firstColor,
                      placeholder: placeholderColor,
                    },
                  }}
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
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../assets/thankyou.png')} />
            <Text style={styles.modalText}>Congratulations 🎉</Text>
            <Text style={styles.modalSubText}>
              Your account is ready to use
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('HomePage');
              }}>
              <Text style={styles.modalButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  heading: {fontSize: hp(3.5), fontFamily: Fonts.heading},
  subText: {fontSize: wp(4), fontFamily: Fonts.regular},
  imageContainer: {
    marginVertical: hp(2),
    width: '100%',
    height: '100%',
  },
  image: {width: '100%', height: '100%', objectFit: 'contain'},
  passwordsContainer: {gap: hp(2)},
  passwordContainer: {
    position: 'relative',
    borderWidth: 1,
    borderColor: Color.firstColor,
    borderRadius: 5,
  },
  input: {
    fontFamily: Fonts.regular,
    padding: hp(0.5),
    fontSize: hp(2),
  },
  eyeIconContainer: {
    position: 'absolute',
    right: wp(4),
    top: hp(2),
  },
  updateBtn: {
    marginVertical: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    gap: hp(1),
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: hp(1),
    textAlign: 'center',
    fontSize: hp(3),
    fontFamily: Fonts.heading,
    color: Color.firstColor,
  },
  modalSubText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
  modalButton: {
    backgroundColor: Color.firstColor,
    padding: hp(2),
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
});
