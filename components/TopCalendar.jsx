import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {ChevronDownIcon} from 'react-native-heroicons/solid';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {useTheme} from '../context/ThemeContext';
import {useDate} from '../context/DateContext';
import {useTaskLength} from '../context/TaskLengthContext';

const TopCalendar = () => {
  const {theme} = useTheme();
  const {todayTaskLength} = useTaskLength();
  const {selectedDated, setSelectedDated} = useDate();
  const date = new Date();
  const currentDate = date.toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [startWeekDay, setStartWeekDay] = useState('');
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => setSelectedDated(selectedDate), [selectedDate]);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDateSelect = date => {
    const startOfWeek = getStartOfWeek(date.dateString);
    setStartWeekDay(startOfWeek);
    setSelectedDate(date.dateString);
    closeModal();
  };

  // Function for formatting the date (e.g., 'Dec 25, 2024')
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Function to get the first day of the week (Monday)
  const getStartOfWeek = dateString => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday (0), subtract 6 days, else subtract (dayOfWeek - 1)
    date.setDate(date.getDate() - daysToSubtract); // Set to the Monday of the week
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0'); // Pad day with zero if it's less than 10
    return `${year}-${month}-${day}`; // Return the formatted start date of the week
  };

  // Function to generate weekdays (Monday to Sunday) with their corresponding dates
  const generateWeekDays = dateString => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If Sunday (0), subtract 6 days, else subtract (dayOfWeek - 1)
    date.setDate(date.getDate() - daysToSubtract); // Set to the Monday of the week

    const weekDays = [];
    const weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Iterate over the 7 days to generate the day names and dates
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(date);
      currentDay.setDate(date.getDate() + i); // Move to the next day in the week
      const formattedDate = currentDay.toISOString().split('T')[0]; // Only take the date in 'YYYY-MM-DD' format

      weekDays.push({
        day: weekDayNames[i], // Day name (Monday, Tuesday, etc.)
        date: formattedDate, // Corresponding date in 'YYYY-MM-DD' format
      });
    }

    return weekDays;
  };

  // Function to handle day selection
  const handleDaySelect = day => {
    setSelectedDate(day); // Set the selected day
  };

  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  useEffect(() => {
    const weekDates = generateWeekDays(selectedDate);
    setWeekDays(weekDates);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', gap: wp(3)}}
        onPress={showModal}>
        <Text
          style={{
            fontFamily: Fonts.subHeading,
            fontSize: hp(2.5),
            color: textColor,
          }}>
          {formatDate(getStartOfWeek(selectedDate))}
        </Text>
        <ChevronDownIcon color={textColor} />
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: Color.firstColor,
                  selectedTextColor: 'white',
                },
              }}
              onDayPress={handleDateSelect} // Handle date selection
              theme={{
                calendarBackground: bgColor, // Set calendar background color
                todayTextColor: Color.firstColor, // Set color for today's date
                arrowColor: Color.firstColor, // Set color of arrows
                monthTextColor: textColor, // Set color of month text
                textSectionTitleColor: Color.firstColor, // Set color for the section title (Mon, Tue, etc.)
                dayTextColor: textColor, // Set color for the day text
                textDisabledColor: 'gray', // Set color for disabled days
                selectedDayBackgroundColor: 'green', // Set selected day background color
                selectedDayTextColor: 'white', // Set selected day text color
              }}
            />
          </View>
        </View>
      </Modal>

      <View style={{marginVertical: hp(2)}}>
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: hp(2),
            color: textColor,
          }}>
          You have total
          <Text style={{color: Color.firstColor}}> {todayTaskLength}</Text>{' '}
          tasks today
        </Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={weekDays}
        keyExtractor={item => item.date}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.date}
            style={[
              styles.dayItem,
              item.date === selectedDate ? styles.selectedDay : null, // Highlight selected day
            ]}
            onPress={() => {
              console.log(item.date);
              handleDaySelect(item.date);
            }} // Handle day selection
          >
            <Text
              style={[
                styles.dateText,
                {color: textColor},
                currentDate === item.date ? styles.currentDay : null,
                item.date === selectedDate ? {color: 'white'} : null,
              ]}>
              {item.date.slice(8, 10)} {/* Day of the month */}
            </Text>
            <Text
              style={[
                styles.dayText,
                currentDate === item.date ? styles.currentDay : null,
                item.date === selectedDate ? {color: 'white'} : null,
              ]}>
              {item.day}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: wp(4),
    padding: hp(2),
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  flatListContainer: {
    height: hp(8),
    marginLeft: hp(-1),
  },
  dayItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingHorizontal: 15,
  },
  selectedDay: {
    backgroundColor: Color.firstColor, // Highlight selected day
    borderColor: '#007bff',
  },
  currentDay: {
    color: Color.firstColor, // Highlight current day with a different color
  },
  dayText: {
    fontSize: hp(2),
    color: 'gray',
    fontFamily: Fonts.regular,
  },
  dateText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TopCalendar;
