import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, LogBox, Text} from 'react-native';
import CustomTimeline from '../components/CustomTimeline';
import {useTheme} from '../context/ThemeContext';
import TopCalendar from '../components/TopCalendar';

const ScheduleScreen = () => {
  const {theme} = useTheme();

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
      <CustomTimeline />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScheduleScreen;
