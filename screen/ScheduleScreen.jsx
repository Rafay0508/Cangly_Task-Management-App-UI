import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Agenda} from 'react-native-calendars';
const ScheduleScreen = () => {
  return (
    <View>
      <Agenda />
      <Text>ScheduleScreen</Text>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
