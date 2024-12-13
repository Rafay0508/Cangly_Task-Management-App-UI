import React, {useCallback, useState, forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {XCircleIcon} from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {useTheme} from '../context/ThemeContext';

const UpdateStatus = forwardRef(({snapPoints = ['35%']}, ref) => {
  const {theme} = useTheme();
  const [statuses, setStatuses] = useState({
    todo: false,
    inProgress: false,
    revision: false,
    completed: false,
  });

  const handleSheetChanges = useCallback(index => {
    console.log('Bottom Sheet Index:', index);
  }, []);

  const toggleCheckbox = status => {
    setStatuses(prevState => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

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
          <Text style={[styles.headerText, {color: textColor}]}>Status</Text>
          <XCircleIcon
            onPress={() => ref.current?.close()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>
        {/* To Do Section */}
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
      </BottomSheetView>
    </BottomSheet>
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
    paddingVertical: hp(1),
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

export default UpdateStatus;
