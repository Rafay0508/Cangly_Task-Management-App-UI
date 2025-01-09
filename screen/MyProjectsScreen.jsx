import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import {useProjects} from '../context/ProjectsContext';
import {useUsersData} from '../context/UsersData';

const MyProjectsScreen = ({placeholder = 'Search'}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {projects} = useProjects();
  const {getUserDetail} = useUsersData();
  const [userDetails, setUserDetails] = useState({});

  const filteredProject = projects?.filter(project =>
    project.projectName.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = {};

      for (const project of projects) {
        for (const member of project.teamMembers) {
          if (!users[member]) {
            const userDetail = await getUserDetail(member);
            users[member] = userDetail;
          }
        }
      }
      setUserDetails(users);
    };
    if (projects) {
      fetchUserDetails();
    }
  }, [projects, getUserDetail]);

  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      <View
        style={[
          styles.searchContainer,
          theme === 'dark'
            ? styles.darkSearchBackground
            : styles.lightSearchBackground,
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
        {filteredProject && filteredProject.length > 0 ? (
          filteredProject.map((project, index) => {
            const progress = Number(project.progress) / 100; // Ensure it's a number (0 to 1)
            return (
              <View
                key={index}
                style={[
                  styles.projectBox,
                  theme === 'dark'
                    ? styles.darkProjectBox
                    : styles.lightProjectBox,
                ]}>
                <View style={styles.topContainer}>
                  <View>
                    <Text style={[styles.projectTitle, {color: textColor}]}>
                      {project.projectName}
                    </Text>
                    <Text style={[styles.projectDate, {color: textColor}]}>
                      {project.submissionDate}
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

                <Text style={[styles.projectDescription, {color: textColor}]}>
                  {project.description}
                </Text>

                <View style={styles.bottomContainer}>
                  <View style={styles.topTextContainer}>
                    <Text style={[styles.progressLabel, {color: textColor}]}>
                      Progress
                    </Text>
                    <Text style={[styles.progressValue, {color: textColor}]}>
                      {project.progress}%
                    </Text>
                  </View>

                  <ProgressBar
                    progress={progress}
                    color={Color.firstColor}
                    style={styles.progressBar}
                  />

                  <View style={styles.bottomTextContainer}>
                    <View style={styles.imageContainer}>
                      {project.teamMembers
                        .slice(0, 3)
                        .map((member, index) =>
                          userDetails[member] ? (
                            <Image
                              key={index}
                              source={{uri: userDetails[member]?.photoURL}}
                              style={styles.profileImage}
                            />
                          ) : null,
                        )}

                      {project.teamMembers.length > 3 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            padding: 8,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={[
                              styles.remainingText,
                              {
                                color: Color.firstColor,
                                fontSize: 18,
                                fontFamily: Fonts.regular,
                              },
                            ]}>
                            +{project.teamMembers.length - 3}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.commentContainer}>
                      <ChatBubbleLeftEllipsisIcon color={textColor} />
                      <Text style={{color: textColor}}>{project.comments}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                      <ClockIcon color={textColor} />
                      <Text style={[styles.timeText, {color: textColor}]}>
                        {project.dueDate}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No Projects available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MyProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: hp(2),
  },
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: 0,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkSearchBackground: {
    backgroundColor: '#222320',
  },
  lightSearchBackground: {
    backgroundColor: 'white',
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: hp(2),
  },
  projectContainer: {
    flex: 1,
    marginVertical: hp(2),
  },
  projectBox: {
    marginVertical: hp(1),
    padding: hp(2),
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '97%',
  },
  darkProjectBox: {
    backgroundColor: '#222320',
  },
  lightProjectBox: {
    backgroundColor: 'white',
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
  projectDescription: {
    marginVertical: hp(2),
    fontFamily: Fonts.regular,
  },
  bottomContainer: {},
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    width: '50%',
    fontFamily: Fonts.regular,
  },
  progressValue: {
    width: '50%',
    textAlign: 'right',
    fontFamily: Fonts.regular,
  },
  progressBar: {
    marginVertical: hp(2),
    height: hp(1),
    borderRadius: 5,
    backgroundColor: '#dde0d7',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  commentContainer: {
    width: '20%',
    flexDirection: 'row',
    gap: wp(2),
  },
  timeContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontFamily: Fonts.regular,
  },
  ellipsisIcon: {
    paddingLeft: wp(2),
  },
});
