import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {Fonts} from '../utils/fonts';
import {useAuth} from '../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import {useTheme} from '../context/ThemeContext';
import {PlusCircleIcon} from 'react-native-heroicons/solid';

const CreateTasks = ({visible, onClose}) => {
  const {theme} = useTheme();
  const {userDetails} = useAuth();

  const handleSave = async () => {
    console.log('xxx');
    // await editProfile(fullName, photoURL, userDetails.uid);
    // onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Add Task</Text>
            <TouchableOpacity
              style={{marginHorizontal: 20}}
              onPress={() => {
                onClose();
              }}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Task Name</Text>
            <TextInput
              style={styles.input}
              //   value={fullName}
              //   onChangeText={setFullName}
            />
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              //   value={userDetails.email}
              editable={false}
            />
            <Text style={styles.inputLabel}>Due Date</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#888"
              placeholder="Task Due Date"
              //   value={new Date(userDetails.createdAt).toLocaleDateString()}
              //   editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              placeholderTextColor="#888"
              //   value={new Date(userDetails.createdAt).toLocaleDateString()}
              //   editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="End Time"
              placeholderTextColor="#888"
              //   value={new Date(userDetails.createdAt).toLocaleDateString()}
              //   editable={false}
            />
          </View>
          <TouchableOpacity
            // disabled={
            //   !projectName ||
            //   !projectDescription ||
            //   !projectType ||
            //   !projectDueDate
            // }
            style={{
              backgroundColor: theme === 'dark' ? '#222320' : 'white',
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.firstColor,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(1.5),
              gap: wp(4),
            }}>
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
        </View>
      </View>
    </Modal>
  );
};

export default CreateTasks;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '90%',
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: hp(3),
    fontFamily: Fonts.heading,
    color: Color.firstColor,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: hp(2),
  },
  inputLabel: {
    textAlign: 'center',
    fontFamily: Fonts.heading,
    fontSize: hp(2),
    marginTop: hp(2),
  },
  input: {
    height: hp(6),
    borderWidth: 1,
    borderColor: Color.firstColor,
    borderRadius: 5,
    paddingLeft: wp(3),
    marginBottom: hp(1),
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: Color.firstColor,
    paddingVertical: hp(1.5),
    width: '48%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc', // Grey color for the cancel button
  },
  buttonText: {
    fontSize: hp(2),
    color: 'white',
    fontFamily: Fonts.regular,
  },
});
