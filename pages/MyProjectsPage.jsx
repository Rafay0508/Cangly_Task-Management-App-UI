import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MyProjects from '../components/MyProjects';
import {useTheme} from '../context/ThemeContext';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {useProjects} from '../context/ProjectsContext';
const MyProjectPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {projects} = useProjects();
  // Array of project data
  // const projects = [
  //   {
  //     id: 1,
  //     title: 'Pintap Project',
  //     date: 'Wednesday 30 Nov, 2022',
  //     description: 'Website | Mobile App Design',
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
  //     progress: 60,
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

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <View
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={{flexDirection: 'row', paddingTop: hp(4)}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <ChevronLeftIcon color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, {color: textColor}]}>My Project's</Text>
      </View>

      {/* Projects Section (Vertical Scroll) */}
      <View style={styles.projectsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {projects.map((project, index) => (
            <MyProjects
              key={index}
              isHorizontal={false}
              project={project}
              index={index}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyProjectPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    width: '80%',
    fontSize: 18,
    fontFamily: Fonts.subHeading,
    marginBottom: 10,
    textAlign: 'center',
  },
  projectsContainer: {
    flex: 1,
    marginTop: 10,
  },
});
