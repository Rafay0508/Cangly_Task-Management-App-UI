import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {Fonts} from '../utils/fonts';
import {useTheme} from '../context/ThemeContext';
import {useDate} from '../context/DateContext';

const TopCalendar = () => {
  const {theme} = useTheme();
  const {setSelectedDate} = useDate();
  const [currentDate, setCurrentDate] = useState(new Date()); // Today's date
  const [weekDays, setWeekDays] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(); // Selected week range
  const [weekOptions, setWeekOptions] = useState([]); // Dropdown week options
  const [selectedDay, setSelectedDay] = useState(''); // Track selected day

  useEffect(() => {
    setSelectedDate(selectedDay);
  }, [selectedDay]);

  // Function to format date as 'Dec 19, 2024'
  const formatDate = date => {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Function to calculate Monday-to-Sunday week ranges
  const getWeekRange = date => {
    const startOfWeek = new Date(date);
    const day = date.getDay();
    const offset = day === 0 ? -6 : 1 - day; // Adjust to Monday
    startOfWeek.setDate(date.getDate() + offset);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Sunday)

    return {
      startOfWeek,
      range: `${
        startOfWeek.getMonth() + 1
      }/${startOfWeek.getDate()}/${startOfWeek.getFullYear()} - ${
        endOfWeek.getMonth() + 1
      }/${endOfWeek.getDate()}/${endOfWeek.getFullYear()}`,
    };
  };

  // Generate weeks starting from the current week to the end of the next month
  const generateWeekOptions = currentDate => {
    const options = [];
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 2,
      0,
    ); // End of next month

    let current = new Date(currentDate); // Start from the current week
    current.setHours(0, 0, 0, 0);

    while (current <= nextMonth) {
      const {startOfWeek, range} = getWeekRange(current);
      const formattedStartDate = formatDate(startOfWeek); // Format the start of the week
      options.push({
        label: formattedStartDate,
        value: startOfWeek.toISOString(),
      });
      current.setDate(current.getDate() + 7); // Move to the next week
    }
    return options;
  };

  // Function to calculate days in the selected week
  const getWeekDays = dateString => {
    const startOfWeek = new Date(dateString);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({
        day: day.toLocaleDateString('en-US', {weekday: 'short'}),
        date: day.getDate(),
        fullDate: day.toDateString(),
      });
    }
    return days;
  };

  // Update weekDays whenever the selected week changes
  useEffect(() => {
    if (selectedWeek) {
      setWeekDays(getWeekDays(selectedWeek));
      // If the selected week is the current week, set the selected day to today
      const currentWeekStart = getWeekRange(
        new Date(),
      ).startOfWeek.toDateString();
      if (new Date(selectedWeek).toDateString() === currentWeekStart) {
        setSelectedDay(new Date().toDateString()); // Set to today if the week is the current week
      } else {
        // Set to Monday of the selected week
        const firstDayOfWeek = getWeekDays(selectedWeek)[0].fullDate;
        setSelectedDay(firstDayOfWeek);
      }
    }
  }, [selectedWeek]);

  // Generate dropdown options on initial render
  useEffect(() => {
    const options = generateWeekOptions(currentDate);
    setWeekOptions(options);
    setSelectedWeek(options[0]?.value); // Default to the first week

    // Automatically set the current date as the selected day
    setSelectedDay(new Date().toDateString());
  }, []);

  // Function to handle day selection
  const handleDaySelect = day => {
    setSelectedDay(day.fullDate); // Update selected day to the clicked day
  };

  // Function to check if a date is the current date
  const isCurrentDate = dayFullDate => {
    return new Date(dayFullDate).toDateString() === new Date().toDateString();
  };

  const bgColor = theme == 'dark' ? 'black' : 'white';
  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {/* Top Section: Week Selector Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedWeek}
          onValueChange={itemValue => setSelectedWeek(itemValue)}
          dropdownIconColor={textColor}
          style={[styles.picker]}>
          {weekOptions.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
              style={{
                fontSize: hp(2.5),
                fontFamily: Fonts.heading,
                color: textColor,
                backgroundColor: bgColor,
              }}
            />
          ))}
        </Picker>
      </View>

      {/* Middle Section: Tasks Display */}
      <Text style={[styles.taskText, {color: textColor}]}>
        You have total 3 tasks today
      </Text>

      {/* Bottom Scrollable Week Calendar */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={weekDays}
        keyExtractor={item => item.fullDate}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.dayItem,
              item.fullDate === selectedDay ? styles.selectedDay : null, // Highlight selected day
            ]}
            onPress={() => handleDaySelect(item)} // Handle day selection
          >
            <Text
              style={[
                styles.dateText,
                {color: textColor},
                isCurrentDate(item.fullDate) ? styles.currentDay : null,
                item.fullDate === selectedDay ? {color: 'white'} : null,
              ]}>
              {item.date}
            </Text>
            <Text
              style={[
                styles.dayText,
                {color: textColor},
                isCurrentDate(item.fullDate) ? styles.currentDay : null,
                item.fullDate === selectedDay ? {color: 'white'} : null,
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
    paddingHorizontal: wp(4),
    justifyContent: 'center',
  },
  dropdownContainer: {
    // marginBottom: 20,
    width: hp(25),
    // borderWidth: 1,
    borderColor: 'none',
    marginLeft: hp(-1),
    // backgroundColor: '#f9f9f9',
    // borderWidth: 1,
  },
  picker: {
    // height: 50,
    // width: '100%',
  },
  taskText: {
    fontSize: hp(1.8),
    marginBottom: 20,

    fontFamily: Fonts.regular,
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
    fontSize: 14,
    color: '#000',
    fontFamily: Fonts.regular,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TopCalendar;
