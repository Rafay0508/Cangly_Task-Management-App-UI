import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TodaysTasksComp from '../components/TodaysTasksComp';
import {useTheme} from '../context/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
const TodaysTasks = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <View
      style={[
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
        styles.container,
      ]}>
      <View style={{flexDirection: 'row', paddingTop: hp(4)}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <ChevronLeftIcon color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, {color: textColor}]}>Today's Tasks</Text>
      </View>
      <TodaysTasksComp />
    </View>
  );
};

export default TodaysTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
    gap: hp(3),
  },
  title: {
    width: '80%',
    fontSize: 18,
    fontFamily: Fonts.subHeading,
    marginBottom: 10,
    textAlign: 'center',
  },
});
