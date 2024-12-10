import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
const notifications = [
  {
    id: 1,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: "You've invited to a new project",
    description: 'Hestia Rouge has invited you to Job Seeker Mobile App.',
    timestamp: 'Jun 23, 2022 at 21:22 PM',
  },
  {
    id: 2,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: 'Password Changed',
    description: 'You’ve successfully changed the password.',
    timestamp: 'Jun 12, 2022 at 22:22 PM',
  },
  {
    id: 3,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: 'Mention in Dashboard Responsive',
    description: 'Patricia Makabe mentioned you in a comment.',
    timestamp: 'Jun 23, 2022 at 21:22 PM',
  },
  {
    id: 4,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: 'Mention in Job Finder Mobile App',
    description: 'Marine Honda mentioned you in a comment.',
    timestamp: 'Jun 23, 2022 at 21:22 PM',
  },
  {
    id: 5,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: 'System Update',
    description: 'Please update to the newest app for an amazing experience.',
    timestamp: 'Jun 23, 2022 at 21:22 PM',
  },
  {
    id: 6,
    icon: require('../assets/profile.jpg'), // Replace with the correct path to your asset
    title: 'New Feature Released',
    description: 'A new feature has been added to your dashboard.',
    timestamp: 'Jul 01, 2022 at 15:45 PM',
  },
];

const Notifications = () => {
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
          Notifications
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.notificationContainer}>
        {notifications.map((notification, index) => (
          <View
            style={[
              styles.notificationBox,
              theme == 'dark' ? {borderColor: '#222320'} : {},
            ]}
            key={index}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/profile.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.message, {color: textColor}]}>
                {notification.title}
              </Text>
              <Text style={[styles.description, {color: textColor}]}>
                {notification.description}
              </Text>
              <Text style={styles.timestamp}>{notification.timestamp}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},

  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  notificationContainer: {},
  notificationBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingTop: hp(2),
    borderColor: '#d1d3cd',
  },
  imageContainer: {},
  image: {width: hp(6), height: hp(6), borderRadius: 25},
  textContainer: {padding: hp(1), width: '90%', gap: hp(1)},
  message: {fontFamily: Fonts.subHeading, fontSize: wp(4)},
  description: {fontFamily: Fonts.regular, fontSize: wp(3.5)},
  timestamp: {fontFamily: Fonts.regular, color: 'gray'},
});
