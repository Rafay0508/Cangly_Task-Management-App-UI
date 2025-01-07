import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {useAuth} from '../context/AuthContext';
import {useProjects} from '../context/ProjectsContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {userDetails} = useAuth();
  const {projects} = useProjects();
  // Array of project data
  // const projects = [
  //   {
  //     id: 1,
  //     title: 'Pintap Project',
  //     date: 'Wednesday 30 Nov, 2022',
  //     description: 'Website | Mobile App Design',
  //     detailedDescription:
  //       'A design project for creating a mobile app and website for Pintap.',
  //     progress: 40,
  //     comments: 5,
  //     timeAgo: '4 Days ago',
  //     teamMembers: [
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'HealthApp',
  //     date: 'Monday 5 Dec, 2023',
  //     description: 'Mobile App Design for Healthcare',
  //     detailedDescription:
  //       'A healthcare app that helps users track health data, appointments, and medication.',
  //     progress: 89,
  //     comments: 12,
  //     timeAgo: '2 Days ago',
  //     teamMembers: [
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'E-Commerce Platform',
  //     date: 'Friday 2 Dec, 2023',
  //     description: 'E-Commerce Website and Mobile App',
  //     detailedDescription:
  //       'A full-stack e-commerce platform including a responsive website and mobile app for online shopping.',
  //     progress: 25,
  //     comments: 2,
  //     timeAgo: '1 Week ago',
  //     teamMembers: [
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //       {imageUrl: '../assets/profile.jpg'},
  //     ],
  //   },
  // ];

  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      {/* Top header section */}
      <View style={styles.topContainer}>
        <Image
          // source={require('../assets/profile.jpg')}
          source={
            userDetails
              ? {uri: userDetails.photoURL}
              : {uri: 'https://shorturl.at/UD9Ft'}
          }
          style={styles.ProfileImage}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.heyText, {color: textColor}]}>Hey👋</Text>
          <Text style={[styles.usernameText, {color: textColor}]}>
            {userDetails ? userDetails.fullName : 'unknown'}
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
        <View style={styles.projectsHeader}>
          <Text style={[styles.projectsTitle, {color: textColor}]}>
            My Projects
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyProjects')}>
            <Text style={[styles.viewAll, {color: Color.firstColor}]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* ScrollView with horizontal scrolling */}
        {projects.length === 0 ? (
          <View style={styles.noProjectsContainer}>
            <Text style={styles.noProjectsText}>No projects available</Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {projects.map((project, index) => (
              <MyProjects
                key={index}
                isHorizontal={true}
                project={project}
                index={index}
              />
            ))}
          </ScrollView>
        )}
      </View>

      {/* Today's Task Section */}
      <View style={styles.todayTasksHeader}>
        <Text style={[styles.projectsTitle, {color: textColor}]}>
          Today's Tasks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('TodaysTasks')}>
          <Text style={[styles.viewAll, {color: Color.firstColor}]}>
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
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  ProfileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: 100,
  },
  textContainer: {
    width: '50%',
  },
  heyText: {
    fontSize: wp(4),
    fontFamily: Fonts.heading,
  },
  usernameText: {
    fontSize: wp(5),
    fontFamily: Fonts.subHeading,
  },
  notificationContainer: {
    padding: wp(2),
    borderRadius: '100%',
    borderWidth: 1,
    borderColor: '#e9ede1',
  },
  searchContainer: {},
  projectsContainer: {},
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  projectsTitle: {
    fontSize: wp(4.5),
    fontFamily: Fonts.heading,
  },
  viewAll: {
    fontFamily: Fonts.heading,
  },
  todayTasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noProjectsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noProjectsText: {
    fontSize: 18,
    color: '#777', // Light gray text color
    fontStyle: 'italic',
  },
});
