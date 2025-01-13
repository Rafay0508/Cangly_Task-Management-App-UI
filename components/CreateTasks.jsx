import React, {useState, useRef} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {Fonts} from '../utils/fonts';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import RNPickerSelect from 'react-native-picker-select';

const CreateTasks = ({visible, onClose, project}) => {
  const {theme} = useTheme();
  const {userDetails} = useAuth();
  const navigation = useNavigation();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date()); // Ensure dueDate is a Date object
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handleAddAssignee = async () => {
    if (!taskName || !description || !dueDate || !startTime || !endTime) {
      Alert.alert('All fields are required');
      return;
    }
    navigation.navigate('AddAssignees', {
      projectName: project.projectName,
      taskTitle: taskName,
      description,
      assignees: [userDetails.uid],
      dueDate: dueDate,
      status: 'todo',
      timeline: {
        startTime,
        endTime,
      },
    });
    onClose();
  };
  const handleDateChange = params => {
    const newDate = params.date;
    const formattedDate = dayjs(newDate);
    const year = formattedDate.year();
    const month = formattedDate.month() + 1;
    const paddedMonth = month < 10 ? '0' + month : month;
    const date = formattedDate.date();
    const paddedDate = date < 10 ? '0' + date : date;
    const selectedDate = year + '-' + paddedMonth + '-' + paddedDate;
    setDueDate(selectedDate);
    setShowDatePicker(false);
  };

  const textColor = theme === 'dark' ? 'white' : 'black';
  const bgColor = theme === 'dark' ? 'rgb(30,40,43)' : 'white';

  // Format the date to a string (e.g., "2025-01-13")
  const formattedDueDate = dayjs(dueDate).format('YYYY-MM-DD');
  const timeOptions = [
    {label: '12:00 AM', value: '12:00 AM'},
    {label: '01:00 AM', value: '01:00 AM'},
    {label: '02:00 AM', value: '02:00 AM'},
    {label: '03:00 AM', value: '03:00 AM'},
    {label: '04:00 AM', value: '04:00 AM'},
    {label: '05:00 AM', value: '05:00 AM'},
    {label: '06:00 AM', value: '06:00 AM'},
    {label: '07:00 AM', value: '07:00 AM'},
    {label: '08:00 AM', value: '08:00 AM'},
    {label: '09:00 AM', value: '09:00 AM'},
    {label: '10:00 AM', value: '10:00 AM'},
    {label: '11:00 AM', value: '11:00 AM'},
    {label: '12:00 PM', value: '12:00 PM'},
    {label: '01:00 PM', value: '01:00 PM'},
    {label: '02:00 PM', value: '02:00 PM'},
    {label: '03:00 PM', value: '03:00 PM'},
    {label: '04:00 PM', value: '04:00 PM'},
    {label: '05:00 PM', value: '05:00 PM'},
    {label: '06:00 PM', value: '06:00 PM'},
    {label: '07:00 PM', value: '07:00 PM'},
    {label: '08:00 PM', value: '08:00 PM'},
    {label: '09:00 PM', value: '09:00 PM'},
    {label: '10:00 PM', value: '10:00 PM'},
    {label: '11:00 PM', value: '11:00 PM'},
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: bgColor}]}>
          <View style={styles.headerContainer}>
            <Text style={styles.modalText}>Add Task</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Task Name</Text>
            <TextInput
              style={styles.input}
              value={taskName}
              onChangeText={setTaskName}
              placeholder="Enter task name"
              placeholderTextColor={'gray'}
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current.focus()}
            />
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description"
              placeholderTextColor={'gray'}
              returnKeyType="next"
              onSubmitEditing={() => dueDateRef.current.focus()}
              ref={descriptionRef}
            />
            <TouchableOpacity
              style={{marginVertical: hp(2)}}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.inputLabel}>
                Due Date: <Text>{formattedDueDate || 'select due Date'}</Text>
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="single"
                date={dueDate} // Pass the Date object
                onChange={handleDateChange}
              />
            )}
            <Text style={styles.inputLabel}>Start Time: </Text>
            <RNPickerSelect
              onValueChange={value => setStartTime(value)}
              items={timeOptions}
              placeholder={{label: 'Select start time', value: startTime}}
              value={startTime}
            />
            <Text style={styles.inputLabel}>End Time: </Text>
            <RNPickerSelect
              onValueChange={value => setEndTime(value)}
              items={timeOptions}
              placeholder={{label: 'Select end time', value: endTime}}
              value={endTime}
            />
          </View>

          <TouchableOpacity
            onPress={handleAddAssignee}
            style={styles.saveButton}>
            <PlusCircleIcon color={Color.firstColor} size={hp(3.5)} />
            <Text style={styles.saveButtonText}>Add Assignees</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    padding: 35,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: hp(3),
    fontFamily: Fonts.heading,
    color: Color.firstColor,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: hp(1),
    borderRadius: 100,
  },
  closeButtonText: {
    color: 'white',
  },
  formContainer: {
    width: '100%',
    marginBottom: hp(2),
  },
  inputLabel: {
    // textAlign: 'center',
    fontFamily: Fonts.heading,
    fontSize: hp(2),
    // marginTop: hp(1),
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
  saveButton: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: Color.firstColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp(1.5),
    gap: wp(4),
  },
  saveButtonText: {
    color: Color.firstColor,
    fontSize: hp(2.3),
    fontFamily: Fonts.regular,
  },
});
