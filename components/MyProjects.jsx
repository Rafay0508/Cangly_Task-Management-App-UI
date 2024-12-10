import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {Fonts} from '../utils/fonts';

const MyProjects = ({isHorizontal, project}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  // Define text color based on the project background color
  // const textColor = project.id === 1 ? 'white' : 'black';

  // Set progress bar color based on the project ID
  const progressBarColor = project.id === 1 ? 'white' : '#3085fe';
  const isProject1 = project.id === 1 ? true : false;

  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  return (
    <View
      style={[
        styles.projectBox,
        isHorizontal && styles.horizontalLayout,

        theme == 'dark'
          ? {backgroundColor: '#222320'}
          : {backgroundColor: 'white'},
        project.id == 1 ? {backgroundColor: '#3085fe'} : {},
      ]}>
      <View style={styles.topContainer}>
        <View>
          <Text
            style={[
              styles.projectTitle,
              isProject1 ? {color: 'white'} : {color: textColor},
            ]}>
            {project.title}
          </Text>
          <Text
            style={[
              styles.projectDate,
              isProject1 ? {color: 'white'} : {color: textColor},
            ]}>
            {project.date}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProjectDetail', {project})}>
          <EllipsisVerticalIcon
            style={styles.ellipsisIcon}
            color={isProject1 ? 'white' : textColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {project.teamMembers.map((member, index) => (
          <Image
            key={index}
            source={require('../assets/profile.jpg')}
            style={styles.profileImage}
          />
        ))}
      </View>
      <Text
        style={[
          {
            marginVertical: hp(2),
            fontFamily: Fonts.regular,
          },
          isProject1 ? {color: 'white'} : {color: textColor},
        ]}>
        {project.description}
      </Text>

      <View style={styles.bottomContainer}>
        <View style={styles.topTextContainer}>
          <Text
            style={[
              {width: '50%', fontFamily: Fonts.regular},
              isProject1 ? {color: 'white'} : {color: textColor},
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
              isProject1 ? {color: 'white'} : {color: textColor},
            ]}>
            {project.progress}%
          </Text>
        </View>
        {/* Progress Bar */}
        <ProgressBar
          progress={project.progress / 100} // Convert percentage to fraction (0 to 1)
          color={progressBarColor} // Dynamically set color based on project.id
          style={styles.progressBar}
        />
        <View style={styles.bottomTextContainer}>
          <View style={{width: '50%', flexDirection: 'row', gap: wp(2)}}>
            <ChatBubbleLeftEllipsisIcon
              color={isProject1 ? 'white' : textColor}
            />
            <Text style={isProject1 ? {color: 'white'} : {color: textColor}}>
              {project.comments}
            </Text>
          </View>
          <View style={{width: '50%', flexDirection: 'row', gap: 4}}>
            <ClockIcon color={isProject1 ? 'white' : textColor} />
            <Text
              style={[
                {fontFamily: Fonts.regular},
                isProject1 ? {color: 'white'} : {color: textColor},
              ]}>
              {project.timeAgo}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyProjects;

const styles = StyleSheet.create({
  projectBox: {
    marginVertical: hp(0.5),
    padding: hp(2),
    backgroundColor: '#fff',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '97%', // Default width for vertical layout
  },
  horizontalLayout: {
    width: '30%', // Decrease width for horizontal scrolling
    marginRight: wp(3),
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
    marginTop: hp(4),
    alignItems: 'center',
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
    justifyContent: 'space-between',
    width: '100%',
  },
  progressBar: {
    marginVertical: hp(2),
    height: hp(1),
    borderRadius: 5,
    backgroundColor: '#dde0d7', // Light background for the progress bar track
  },
});
