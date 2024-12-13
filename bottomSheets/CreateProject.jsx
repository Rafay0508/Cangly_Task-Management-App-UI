import React, {useCallback, useState, forwardRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {PlusCircleIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {useTheme} from '../context/ThemeContext';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
const CreateProject = forwardRef(({snapPoints = ['35%']}, ref) => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const handleSheetChanges = useCallback(index => {
    console.log('Bottom Sheet Index:', index);
  }, []);

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
          <Text style={[styles.headerText, {color: textColor}]}>
            Create New Project
          </Text>
          <XCircleIcon
            onPress={() => ref.current?.close()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>
        {/* To Do Section */}
        <View style={styles.listContainer}>
          <TextInput
            placeholder="Enter Project Name"
            placeholderTextColor="gray"
            style={{
              color: textColor,
              borderWidth: 1,
              borderColor: Color.borderBottomColor,
              padding: wp(3),
              fontSize: wp(4),
            }}
          />
          <TextInput
            placeholder="Select Visibility"
            placeholderTextColor="gray"
            style={{
              color: textColor,
              borderWidth: 1,
              borderColor: Color.borderBottomColor,
              padding: wp(3),
              fontSize: wp(4),
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: theme == 'dark' ? '#222320' : 'white',
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              borderColor: Color.firstColor,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(1.5),
              gap: wp(4),
            }}
            onPress={() => navigation.navigate('TeamMember')}>
            <PlusCircleIcon color={Color.firstColor} size={hp(3.5)} />
            <Text
              style={{
                color: Color.firstColor,
                fontSize: hp(2.3),
                fontFamily: Fonts.regular,
              }}>
              Add Member
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',

              backgroundColor: Color.firstColor,
              alignItems: 'center',
              justifyContent: 'center',
              padding: hp(1.5),
              gap: wp(4),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: hp(2.3),
                fontFamily: Fonts.regular,
              }}>
              Create Project
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: wp(6),
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
    padding: hp(2),
    gap: hp(3),
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

export default CreateProject;
