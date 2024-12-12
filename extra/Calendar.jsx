import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const Calendar = () => {
  // Initializing the date state with a JavaScript Date object
  const [date, setDate] = useState(dayjs().toDate()); // .toDate() converts dayjs to a Date object

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={params => setDate(params.date)} // Ensure the date is updated as a native Date object
      />
      {/* You can display the selected date here */}
      <Text>{dayjs(date).format('YYYY-MM-DD')}</Text>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
