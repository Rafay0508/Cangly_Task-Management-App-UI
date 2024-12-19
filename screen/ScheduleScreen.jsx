import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import CustomTimeline from '../components/CustomTimeline';
import {useTheme} from '../context/ThemeContext';
import TopCalendar from '../components/TopCalendar';

const ScheduleScreen = () => {
  const {theme} = useTheme();
  const currentDate = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Suppress specific warning
  useEffect(() => {
    LogBox.ignoreLogs([
      'Warning: ExpandableCalendar: Support for defaultProps will be removed from function components',
    ]);
  }, []);

  // Dynamically set the text and background color based on the theme
  const textColor = theme === 'dark' ? 'white' : 'black';
  const bgColor = theme === 'dark' ? 'black' : 'white';

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
      ]}>
      <TopCalendar />
      <CustomTimeline currentDate={selectedDate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScheduleScreen;
