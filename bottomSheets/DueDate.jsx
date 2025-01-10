import React, {forwardRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useTheme} from '../context/ThemeContext';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs'; // Import dayjs
import {useProjects} from '../context/ProjectsContext';

// Forward the ref directly to ActionSheet component
const DueDate = forwardRef((props, ref) => {
  const {project} = props;
  const {theme} = useTheme();
  const {updateProjectDueDate} = useProjects();
  const [date, setDate] = useState(project.dueDate);
  const textColor = theme == 'dark' ? 'white' : 'black';

  const changeHandler = newDate => {
    const formattedDate = dayjs(newDate);
    const year = formattedDate.year();
    const month = formattedDate.month() + 1;
    const date = formattedDate.date();
    const selectedDate = year + '-' + month + '-' + date;
    setDate(selectedDate);
    updateProjectDueDate(project.projectName, selectedDate);
    ref.current?.hide();
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
          <Text style={[styles.headerText, {color: textColor}]}>Due Date</Text>

          <XCircleIcon
            onPress={() => ref.current?.hide()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>
        <View style={styles.listContainer}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={params => changeHandler(params.date)}
            headerButtonColor={'white'}
            headerButtonStyle={{backgroundColor: Color.firstColor}}
            weekDaysTextStyle={{color: textColor}}
            calendarTextStyle={{color: textColor}}
            selectedItemColor={Color.firstColor}
            todayContainerStyle={{borderColor: Color.firstColor}}
            headerTextStyle={{color: textColor, fontFamily: Fonts.heading}}
            style={{
              color: theme === 'dark' ? 'white' : '#000',
            }}
          />
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
    marginTop: hp(3),
  },
});

export default DueDate;
