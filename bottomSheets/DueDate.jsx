import React, {useCallback, useState, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {XCircleIcon} from 'react-native-heroicons/outline';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {useTheme} from '../context/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';

const DueDate = forwardRef(({snapPoints = ['35%']}, ref) => {
  const {theme} = useTheme(); // Access the theme context
  const [date, setDate] = useState(dayjs());

  const handleSheetChanges = useCallback(index => {
    console.log('Bottom Sheet Index:', index);
  }, []);

  const styles = createStyles(theme); // Generate styles based on theme
  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <BottomSheet
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      backgroundStyle={{
        backgroundColor: theme === 'dark' ? '#222320' : '#fff',
      }}>
      <BottomSheetView style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Due Date</Text>
          <XCircleIcon
            onPress={() => ref.current?.close()}
            style={styles.icon}
            size={hp(3)}
          />
        </View>
        {/* Date Picker Section */}
        <View style={styles.listContainer}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={params => setDate(params.date)}
            headerButtonColor={textColor}
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
      </BottomSheetView>
    </BottomSheet>
  );
});

// Dynamic styles based on the theme
const createStyles = theme =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: theme === 'dark' ? '#222320' : '#fff', // Dark/Light background
    },
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: hp(1),
    },
    headerText: {
      fontSize: hp(2.5),
      color: theme === 'dark' ? '#fff' : '#000', // Dark/Light text color
    },
    icon: {
      width: 24,
      height: 24,
      color: theme === 'dark' ? '#fff' : '#333', // Dark/Light icon color
    },
    listContainer: {
      width: '100%',
      paddingHorizontal: 10,
    },
  });

export default DueDate;
