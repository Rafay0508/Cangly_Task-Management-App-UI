import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
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
import DateTimePicker from 'react-native-ui-datepicker'; // Import DateTimePicker
import dayjs from 'dayjs';

const CreateProjectModal = ({isModalOpen, onClose}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(isModalOpen);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [projectDueDate, setProjectDueDate] = useState(null); // Default to current date
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setModalVisible(isModalOpen);
  }, [isModalOpen]);

  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  const handleCreateProject = () => {
    if (projectName && projectDescription && projectType && projectDueDate) {
      navigation.navigate('AddTeamMemberWhenCreate', {
        projectName,
        projectDescription,
        projectType,
        projectDueDate,
      });
    } else {
      Alert.alert('all field required');
    }
  };

  const inputStyle = {
    color: textColor,
    borderWidth: 1,
    borderColor: Color.borderBottomColor,
    padding: wp(3),
    fontSize: wp(4),
  };

  const handleDateChange = params => {
    const newDate = params.date;
    const formattedDate = dayjs(newDate);
    const year = formattedDate.year();
    const month = formattedDate.month() + 1;
    const date = formattedDate.date();
    const selectedDate = year + '-' + month + '-' + date;
    setProjectDueDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <>
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
              value={projectName}
              style={inputStyle}
              returnKeyType="next"
              onSubmitEditing={() => projectDescriptionRef.current.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="Add Description"
              onChangeText={setProjectDescription}
              value={projectDescription}
              placeholderTextColor="gray"
              style={inputStyle}
              returnKeyType="next"
              onSubmitEditing={() => projectTypeRef.current.focus()}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder="Add Project Type"
              onChangeText={setProjectType}
              value={projectType}
              placeholderTextColor="gray"
              style={inputStyle}
              returnKeyType="next"
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)} // Open date picker on click
              style={inputStyle}>
              <Text style={{color: textColor}}>
                <Text>Due Date: </Text>
                {projectDueDate || 'Select Due Date'}
              </Text>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            {showDatePicker && (
              <DateTimePicker
                mode="single"
                date={projectDueDate} // Pass a Date object to DateTimePicker
                onChange={handleDateChange}
                onCancel={() => setShowDatePicker(false)}
              />
            )}

            <TouchableOpacity
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
              onPress={handleCreateProject}>
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
    </>
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
