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
import {useNavigation} from '@react-navigation/native';

const CreateProjectModal = ({isModalOpen, onClose}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(isModalOpen);
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [projectType, setProjectType] = useState();
  const [projectDueDate, setProjectDueDate] = useState();

  useEffect(() => {
    setModalVisible(isModalOpen);
  }, [isModalOpen]);

  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  const handleCreateProject = () => {
    // Perform validation here if necessary
    if (projectName && projectDescription && projectType && projectDueDate) {
      navigation.navigate('AddTeamMemberWhenCreate', {
        projectName,
        projectDescription,
        projectType,
        projectDueDate,
      });
    }
  };

  const inputStyle = {
    color: textColor,
    borderWidth: 1,
    borderColor: Color.borderBottomColor,
    padding: wp(3),
    fontSize: wp(4),
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      swipeThreshold={200}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <KeyboardAvoidingView
        style={[
          {backgroundColor: theme === 'dark' ? 'rgb(30,40,43)' : 'white'},
        ]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]}>
            Create New Project
          </Text>
          <TouchableOpacity style={{padding: 10}} onPress={onClose}>
            <XCircleIcon style={styles.icon} size={hp(3)} color={textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <TextInput
            placeholder="Enter Project Name"
            placeholderTextColor="gray"
            onChangeText={setProjectName}
            style={inputStyle}
          />
          <TextInput
            placeholder="Add Description"
            onChangeText={setProjectDescription}
            placeholderTextColor="gray"
            style={inputStyle}
          />
          <TextInput
            placeholder="Add Project Type"
            onChangeText={setProjectType}
            placeholderTextColor="gray"
            style={inputStyle}
          />
          <TextInput
            placeholder="Enter Due Date (eg: YYYY-MM-DD)"
            placeholderTextColor="gray"
            onChangeText={setProjectDueDate}
            style={inputStyle}
          />

          <TouchableOpacity
            disabled={
              !projectName ||
              !projectDescription ||
              !projectType ||
              !projectDueDate
            }
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
            }}
            onPress={() =>
              navigation.navigate('AddTeamMemberWhenCreate', {
                projectName,
                projectDescription,
                projectType,
                projectDueDate,
              })
            }>
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
});

export default CreateProjectModal;
