import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../context/ThemeContext'; // Array of project data
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {Fonts} from '../utils/fonts';
import {ProgressBar} from 'react-native-paper';
import {Color} from '../utils/colors';

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

const MyProjectsScreen = ({placeholder = 'Search'}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <View
      style={[
        styles.container,
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View
        style={[
          styles.searchContainer,
          theme == 'dark'
            ? {backgroundColor: '#222320'}
            : {backgroundColor: 'white'},
        ]}>
        <TouchableOpacity>
          <MagnifyingGlassIcon
            size={hp(3.5)}
            color={textColor}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {color: textColor}]}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView style={styles.projectContainer}>
        {projects.map((project, index) => {
          const progress = Number(project.progress) / 100; // Ensure it's a number (0 to 1)
          return (
            <View
              key={index}
              style={[
                styles.projectBox,
                theme == 'dark'
                  ? {backgroundColor: '#222320'}
                  : {backgroundColor: 'white'},
              ]}>
              <View style={styles.topContainer}>
                <View>
                  <Text style={[styles.projectTitle, {color: textColor}]}>
                    {project.title}
                  </Text>
                  <Text style={[styles.projectDate, {color: textColor}]}>
                    {project.date}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProjectAbout', {project})
                  }>
                  <EllipsisVerticalIcon
                    style={styles.ellipsisIcon}
                    color={textColor}
                    size={30}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  {
                    marginVertical: hp(2),
                    fontFamily: Fonts.regular,
                  },
                  {color: textColor},
                ]}>
                {project.description}
              </Text>

              <View style={styles.bottomContainer}>
                <View style={styles.topTextContainer}>
                  <Text
                    style={[
                      {width: '50%', fontFamily: Fonts.regular},
                      {color: textColor},
                    ]}>
                    Progress
                  </Text>
                  <Text
                    style={[
                      {
                        width: '50%',
                        textAlign: 'right',
                        fontFamily: Fonts.regular,
                      },
                      {color: textColor},
                    ]}>
                    {project.progress}%
                  </Text>
                </View>
                {/* Progress Bar */}
                <ProgressBar
                  progress={progress} // Convert percentage to fraction (0 to 1)
                  color={Color.firstColor}
                  style={styles.progressBar}
                />
                <View style={styles.bottomTextContainer}>
                  <View style={styles.imageContainer}>
                    {project.teamMembers.map((member, index) => (
                      <Image
                        key={index}
                        source={require('../assets/profile.jpg')}
                        style={styles.profileImage}
                      />
                    ))}
                  </View>
                  <View
                    style={{width: '20%', flexDirection: 'row', gap: wp(2)}}>
                    <ChatBubbleLeftEllipsisIcon color={textColor} />
                    <Text style={{color: textColor}}>{project.comments}</Text>
                  </View>
                  <View style={{width: '50%', flexDirection: 'row', gap: 4}}>
                    <ClockIcon color={textColor} />
                    <Text
                      style={[{fontFamily: Fonts.regular}, {color: textColor}]}>
                      {project.timeAgo}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MyProjectsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(2)},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: wp(4),
    borderWidth: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    color: '#000',
  },
  projectContainer: {flex: 1, marginVertical: hp(2)},
  projectBox: {
    marginVertical: hp(1),
    padding: hp(2),
    backgroundColor: '#fff',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '97%', // Default width for vertical layout
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectTitle: {
    fontFamily: Fonts.heading,
    fontSize: wp(4.5),
  },
  projectDate: {
    fontFamily: Fonts.regular,
    color: 'gray',
    fontSize: wp(3),
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: -15,
    borderRadius: 25,
  },
  bottomContainer: {},
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressBar: {
    marginVertical: hp(2),
    height: hp(1),
    borderRadius: 5,
    backgroundColor: '#dde0d7',
  },
});
