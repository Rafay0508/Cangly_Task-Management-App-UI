// import React from 'react';
// import {SafeAreaView, StyleSheet} from 'react-native';
// import {
//   ExpandableCalendar,
//   TimelineList,
//   CalendarProvider,
// } from 'react-native-calendars';

// const SAMPLE_EVENTS = {
//   '2024-12-13': [
//     {
//       id: '1',
//       start: '2024-12-13 09:00:00',
//       end: '2024-12-13 10:00:00',
//       title: 'Morning Meeting',
//       color: 'lightblue',
//     },
//     {
//       id: '2',
//       start: '2024-12-13 11:00:00',
//       end: '2024-12-13 12:00:00',
//       title: 'Project Discussion',
//       color: 'lightgreen',
//     },
//     {
//       id: '3',
//       start: '2024-12-13 14:00:00',
//       end: '2024-12-13 15:00:00',
//       title: 'Client Call',
//       color: 'lightcoral',
//     },
//   ],
//   '2024-12-14': [
//     {
//       id: '4',
//       start: '2024-12-14 10:00:00',
//       end: '2024-12-14 11:00:00',
//       title: 'Team Sync',
//       color: 'lightyellow',
//     },
//   ],
// };

// const ScheduleScreen = () => {
//   // Static date for the calendar (no state changes)
//   const currentDate = '2024-12-13';

//   // Marked dates for events (keep it static)
//   const markedDates = Object.keys(SAMPLE_EVENTS).reduce((acc, date) => {
//     acc[date] = {marked: true};
//     SAMPLE_EVENTS[date].forEach(event => {
//       acc[`${date}_${event.id}`] = {marked: true};
//     });
//     return acc;
//   }, {});

//   return (
//     <SafeAreaView style={styles.container}>
//       <CalendarProvider date={currentDate}>
//         <ExpandableCalendar
//           firstDay={1}
//           markedDates={{
//             ...markedDates,
//             [currentDate]: {selected: true, marked: true},
//           }}
//         />
//         <TimelineList
//           events={SAMPLE_EVENTS}
//           timelineProps={{
//             format24h: true,
//             initialTime: {hour: 8, minutes: 0},
//           }}
//           showNowIndicator
//         />
//       </CalendarProvider>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: 'white'},
// });

// export default ScheduleScreen;
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScheduleScreen = () => {
  return (
    <View>
      <Text>ScheduleScreen</Text>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
