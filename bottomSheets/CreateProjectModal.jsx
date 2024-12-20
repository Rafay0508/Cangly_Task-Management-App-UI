import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {PlusCircleIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
const CreateProjectModal = ({isModalOpen, onClose}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(isModalOpen);
  const [selectedLanguage, setSelectedLanguage] = useState();

  // Sync the modal state with the prop `isModalOpen`
  useEffect(() => {
    setModalVisible(isModalOpen);
  }, [isModalOpen]);

  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';
  const toggleModal = () => {
    setModalVisible(prev => !prev); // Toggle the modal state
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={null}
      onBackButtonPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      swipeThreshold={200}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <KeyboardAvoidingView
        style={[
          theme == 'dark'
            ? {backgroundColor: 'rgb(30,40,43)'}
            : {backgroundColor: 'white'},
        ]}>
        {/* Header Section */}

        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]} disabled>
            Create New Project
          </Text>
          <TouchableOpacity style={{padding: 10}} onPress={onClose}>
            <XCircleIcon style={styles.icon} size={hp(3)} color={textColor} />
          </TouchableOpacity>
        </View>
        {/* To Do Section */}
        <View style={styles.listContainer}>
          <TextInput
            placeholder="Enter Project Name"
            placeholderTextColor="gray"
            style={{
              color: textColor,
              borderWidth: 1,
              borderColor: Color.borderBottomColor,
              padding: wp(3),
              fontSize: wp(4),
            }}
          />
          <View
            style={{
              color: textColor,
              borderWidth: 1,
              borderColor: Color.borderBottomColor,
              // padding: wp(3),
              fontSize: wp(4),
            }}>
            <Picker
              selectedValue={selectedLanguage}
              style={{
                color: 'gray',
              }}
              placeholder="Select Visibility"
              dropdownIconColor={textColor}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Select Visibility" value="" enabled={false} />
              <Picker.Item label="Public" value="Public" />
              <Picker.Item label="Private" value="Private" />
            </Picker>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: theme == 'dark' ? '#222320' : 'white',
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.firstColor,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(1.5),
              gap: wp(4),
            }}
            onPress={() => navigation.navigate('TeamMember')}>
            <PlusCircleIcon color={Color.firstColor} size={hp(3.5)} />
            <Text
              style={{
                color: Color.firstColor,
                fontSize: hp(2.3),
                fontFamily: Fonts.regular,
              }}>
              Add Member
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',

              backgroundColor: Color.firstColor,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(1.5),
              gap: wp(4),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(2.3),
                fontFamily: Fonts.regular,
              }}>
              Create Project
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

    marginTop: hp(3),
  },
  headerText: {
    fontSize: hp(2.5),
    fontFamily: Fonts.heading,
  },
  icon: {
    width: 24,
    height: 24,
  },
  listContainer: {
    width: '100%',
    padding: hp(2),
    gap: hp(3),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: hp(2),
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
});

export default CreateProjectModal;
