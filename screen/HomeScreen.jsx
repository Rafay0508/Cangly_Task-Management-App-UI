import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projects.length === 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [projects]);

  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      <View style={styles.topContainer}>
        <Image
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

        {loading ? (
          // Show ActivityIndicator when no projects are available
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : projects.length === 0 ? (
          // Show "No projects available" after loading
          <View style={styles.noProjectsContainer}>
            <Text style={styles.noProjectsText}>No projects available</Text>
          </View>
        ) : (
          // Display the list of projects if they exist
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
