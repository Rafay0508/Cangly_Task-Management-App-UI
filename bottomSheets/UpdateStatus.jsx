import React, {forwardRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useTheme} from '../context/ThemeContext';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import dayjs from 'dayjs';

// Forward the ref directly to ActionSheet component
const DueDate = forwardRef((props, ref) => {
  const {theme} = useTheme();
  const [date, setDate] = useState(dayjs());
  const [statuses, setStatuses] = useState({
    todo: false,
    inProgress: false,
    revision: false,
    completed: false,
  });

  const textColor = theme == 'dark' ? 'white' : 'black';

  // Toggle function to select only one checkbox at a time and close the ActionSheet
  const toggleCheckbox = status => {
    setStatuses({
      todo: false,
      inProgress: false,
      revision: false,
      completed: false,
      [status]: true, // Select the clicked status
    });
    ref.current?.hide(); // Close the ActionSheet after selecting the checkbox
  };

  return (
    <ActionSheet
      ref={ref}
      closable={false}
      onClose={props.onClose}
      backgroundInteractionEnabled={false}
      isModal={false}>
      <View style={theme == 'dark' ? {backgroundColor: 'rgb(30,40,43)'} : {}}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]}>Status</Text>

          <XCircleIcon
            onPress={() => ref.current?.hide()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>

        {/* Status Section */}
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>To Do</Text>
            <CheckBox
              isChecked={statuses.todo}
              onClick={() => toggleCheckbox('todo')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>
              In-Progress
            </Text>
            <CheckBox
              isChecked={statuses.inProgress}
              onClick={() => toggleCheckbox('inProgress')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>Revision</Text>
            <CheckBox
              isChecked={statuses.revision}
              onClick={() => toggleCheckbox('revision')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={[styles.listItem, {borderBottomWidth: 0}]}>
            <Text style={[styles.listText, {color: textColor}]}>Completed</Text>
            <CheckBox
              isChecked={statuses.completed}
              onClick={() => toggleCheckbox('completed')}
              checkBoxColor={Color.firstColor}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    paddingHorizontal: 10,
    marginVertical: hp(3),
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

export default DueDate;
