import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';
import {BellAlertIcon} from 'react-native-heroicons/outline';
import MyProjects from '../components/MyProjects';
import {useNavigation} from '@react-navigation/native';
import TodaysTasks from '../components/TodaysTasksComp';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchBar from '../components/SearchBar';
import {ChatBubbleLeftEllipsisIcon} from 'react-native-heroicons/solid';
import {Color} from '../utils/colors';
const HomeScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  // Array of project data
  const projects = [
    {
      id: 1,
      title: 'Pintap Project',
      date: 'Wednesday 30 Nov, 2022',
      description: 'Website | Mobile App Design',
      detailedDescription:
        'A design project for creating a mobile app and website for Pintap.',
      progress: 40,
      comments: 5,
      timeAgo: '4 Days ago',
      teamMembers: [
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
      ],
    },
    {
      id: 2,
      title: 'HealthApp',
      date: 'Monday 5 Dec, 2023',
      description: 'Mobile App Design for Healthcare',
      detailedDescription:
        'A healthcare app that helps users track health data, appointments, and medication.',
      progress: 89,
      comments: 12,
      timeAgo: '2 Days ago',
      teamMembers: [
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
      ],
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      date: 'Friday 2 Dec, 2023',
      description: 'E-Commerce Website and Mobile App',
      detailedDescription:
        'A full-stack e-commerce platform including a responsive website and mobile app for online shopping.',
      progress: 25,
      comments: 2,
      timeAgo: '1 Week ago',
      teamMembers: [
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
        {imageUrl: '../assets/profile.jpg'},
      ],
    },
  ];

  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <View
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      {/* Top header section */}
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/profile.jpg')}
          style={styles.ProfileImage}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.heyText, {color: textColor}]}>Hey👋</Text>
          <Text style={[styles.usernameText, {color: textColor}]}>
            Shane Watson
          </Text>
        </View>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate('Messages')}>
          <ChatBubbleLeftEllipsisIcon size={25} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate('Notification')}>
          <BellAlertIcon size={25} color={textColor} />
        </TouchableOpacity>
      </View>
      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
      {/* Projects Section (Horizontal Scroll) */}
      <View style={styles.projectsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: hp(1),
          }}>
          <Text
            style={{
              fontSize: wp(4.5),
              color: textColor,
              fontFamily: Fonts.heading,
            }}>
            My Projects
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyProjects')}>
            <Text style={{color: Color.firstColor, fontFamily: Fonts.heading}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* ScrollView with horizontal scrolling */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {projects.map((project, index) => (
            <MyProjects key={index} isHorizontal={true} project={project} />
          ))}
        </ScrollView>
      </View>

      {/* todays Task Section */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: wp(4.5),
            color: textColor,
            fontFamily: Fonts.heading,
          }}>
          Todays Tasks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('TodaysTasks')}>
          <Text style={{color: Color.firstColor, fontFamily: Fonts.heading}}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <TodaysTasks />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
    paddingTop: hp(3),
    gap: hp(2),
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  ProfileImage: {width: hp(6), height: hp(6), borderRadius: 100},
  textContainer: {width: '50%'},
  heyText: {fontSize: wp(4), fontFamily: Fonts.heading},
  usernameText: {fontSize: wp(5), fontFamily: Fonts.subHeading},
  notificationContainer: {
    padding: wp(2),
    borderRadius: '100%',
    borderWidth: 1,
    borderColor: '#e9ede1',
  },
  searchContainer: {},
  projectsContainer: {},
});
