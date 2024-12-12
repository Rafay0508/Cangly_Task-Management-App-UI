import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import {HandThumbUpIcon} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {Color} from '../utils/colors';
const SearchPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <View
      style={[
        styles.container,
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <ChevronLeftIcon
            color={textColor}
            size={wp(7)}
            onPress={() => navigation.navigate('HomePage')}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            fontFamily: Fonts.subHeading,
            fontSize: wp(5),
            color: textColor,
          }}>
          Search
        </Text>
      </View>
      <SearchBar />
      <Text style={styles.suggestionText}>Suggestion</Text>
      <View style={styles.suggestionContainer}>
        <TouchableOpacity
          style={[
            styles.suggestionBox,
            theme == 'dark'
              ? {backgroundColor: '#222320'}
              : {backgroundColor: 'white'},
          ]}>
          <View
            style={[
              styles.iconBox,
              theme == 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}>
            <View style={styles.iconBox}>
              <HandThumbUpIcon color={Color.firstColor} />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: textColor,
                fontFamily: Fonts.heading,
                fontSize: hp(2),
              }}>
              Client Review & Feedback
            </Text>
            <Text style={{color: 'gray', fontFamily: Fonts.regular}}>
              Dec 1, 2022 - Dec 3, 2022
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.suggestionBox,
            theme == 'dark'
              ? {backgroundColor: '#222320'}
              : {backgroundColor: 'white'},
          ]}>
          <View
            style={[
              styles.iconBox,
              theme == 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}>
            <View style={styles.iconBox}>
              <HandThumbUpIcon color={Color.firstColor} />
            </View>
          </View>
          <View>
            <Text
              style={{
                color: textColor,
                fontFamily: Fonts.heading,
                fontSize: hp(2),
              }}>
              Client Review & Feedback
            </Text>
            <Text style={{color: 'gray', fontFamily: Fonts.regular}}>
              Dec 1, 2022 - Dec 3, 2022
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},

  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  suggestionText: {
    marginVertical: hp(2),
    fontFamily: Fonts.heading,
    fontSize: hp(2.5),
    color: 'gray',
  },
  suggestionContainer: {gap: hp(2)},
  iconBox: {
    padding: hp(1),
    // backgroundColor: '#272a2e',
    borderRadius: 25,
  },
  suggestionBox: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: hp(2),

    // Elevation for Android
    elevation: 5,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10, // Optional: Add rounded corners
  },
});
