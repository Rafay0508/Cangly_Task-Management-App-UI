import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '../context/ThemeContext';
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  PaperAirplaneIcon,
  PencilIcon,
  UserGroupIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import {Color} from '../utils/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UpdateStatus from '../bottomSheets/UpdateStatus';
import FileAttach from '../bottomSheets/FileAttach';
import DueDate from '../bottomSheets/DueDate';
import {BlurView} from '@react-native-community/blur';
import {useProjects} from '../context/ProjectsContext';
import {useUsersData} from '../context/UsersData';
const ProjectAbout = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {project} = route.params;

  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to track if sheet is open

  const textColor = theme == 'dark' ? 'white' : 'black';
  const {tasksByProject} = useProjects();
  const {getUserDetail} = useUsersData();
  const [tasksForProject, setTasksForProject] = useState([]);
  const [projectManagerDetails, setProjectManagerDetails] = useState(null);
  const [teamMemberDetails, setTeamMemberDetails] = useState([]);
  useEffect(() => {
    if (!tasksByProject || !project || !project.projectName) {
      return;
    }
    const tasksForProject = tasksByProject[project.projectName] || []; // Access tasks for the specific project

    setTasksForProject(tasksForProject);
  }, [project, tasksByProject]);

  useEffect(() => {
    const fetchProjectManagerDetails = async () => {
      if (project.projectManager) {
        const details = await getUserDetail(project.projectManager);
        setProjectManagerDetails(details);
      }
    };
    fetchProjectManagerDetails();
  }, [project.projectManager]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = {};

      for (const member of project.teamMembers) {
        // Directly iterate through teamMembers
        if (!users[member]) {
          const userDetail = await getUserDetail(member);
          users[member] = userDetail;
        }
      }
      setTeamMemberDetails(users);
    };
    if (project) {
      fetchUserDetails();
    }
  }, [project, getUserDetail]);

  const updateStatusActionSheetRef = useRef(null);
  const fileAttachActionSheetRef = useRef(null);
  const dueDateActionSheetRef = useRef(null);

  const openUpdateStatusActionSheet = () => {
    setIsSheetOpen(true);
    updateStatusActionSheetRef.current?.show();
  };
  const openFileAttachActionSheet = () => {
    setIsSheetOpen(true);
    fileAttachActionSheetRef.current?.show();
  };
  const openDueDateActionSheet = () => {
    setIsSheetOpen(true);
    dueDateActionSheetRef.current?.show();
  };
  const closeSheets = () => {
    setIsSheetOpen(false);
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView
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
          <Text style={[styles.projectTitle, {color: textColor}]}>
            {project.projectName}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <StarIcon color={'#ffc832'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <EllipsisVerticalIcon size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={[styles.detailedDescription, {color: textColor}]}>
            {project.description}
          </Text>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <UserGroupIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Team</Text>
              </View>
              <View style={styles.teamImagesContainer}>
                {project.teamMembers
                  .slice(0, 3)
                  .map((member, index) =>
                    teamMemberDetails[member] ? (
                      <Image
                        key={index}
                        source={{uri: teamMemberDetails[member]?.photoURL}}
                        style={styles.teamMemberImage}
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
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <UserIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>PM</Text>
              </View>
              <View style={styles.PMContainer}>
                {projectManagerDetails ? (
                  <Image
                    source={{uri: projectManagerDetails.photoURL}}
                    style={styles.teamMemberImage}
                  />
                ) : (
                  <Text> 'Loading...'</Text>
                )}

                <Text style={{color: Color.firstColor}}>
                  {projectManagerDetails && projectManagerDetails.fullName}
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <PencilIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Status</Text>
              </View>
              <View style={styles.teamImagesContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={openUpdateStatusActionSheet}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: wp(3),
                      color: 'white',
                    }}>
                    {project.status}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <CalendarDaysIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Due Date</Text>
              </View>
              <TouchableOpacity
                style={styles.teamImagesContainer}
                onPress={openDueDateActionSheet}>
                <Text style={{fontFamily: Fonts.regular, color: textColor}}>
                  {project.dueDate}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <ClipboardDocumentListIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>
                  File Attach
                </Text>
              </View>
              <View style={styles.teamImagesContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={openFileAttachActionSheet}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: wp(3),

                      color: 'white',
                    }}>
                    + Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              borderWidth: 0.5,
              padding: hp(2),
              marginVertical: hp(2),
              borderColor: Color.firstColor,
              backgroundColor:
                theme == 'dark' ? '#222320' : 'rgb(246, 249, 253)',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: hp(2),
                fontFamily: Fonts.regular,

                color: Color.firstColor,
              }}>
              Add Property
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: Fonts.subHeading,
            fontSize: hp(2),
            marginBottom: hp(2),
            color: textColor,
          }}>
          Sub Tasks
        </Text>
        <ScrollView style={styles.tasksContainer}>
          {tasksForProject.length > 0 ? (
            tasksForProject.map((task, index) => (
              <View
                style={[
                  styles.taskCard,
                  theme == 'dark'
                    ? {backgroundColor: '#222320'}
                    : {backgroundColor: 'white'},
                ]}
                key={index}>
                <View style={styles.taskHeader}>
                  <View>
                    <Text style={[styles.taskName, {color: textColor}]}>
                      {task.taskTitle}
                    </Text>
                    <Text style={styles.taskdeadline}>
                      {project.projectName}
                    </Text>
                  </View>
                  <CheckBox
                    isChecked={true}
                    onClick={() => console.log('task checked')}
                    checkBoxColor={Color.firstColor}
                  />
                </View>
                <View style={styles.taskDetails}>
                  <Text style={styles.taskComment}>{task.dueDate}</Text>
                  <Text style={styles.taskComment}>
                    {task.timeline.startTime} - {task.timeline.endTime}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {task.assignees.slice(0, 3).map((member, index) => {
                      return (
                        <Image
                          key={index}
                          source={{uri: member.photoURL}}
                          style={styles.profileImage}
                        />
                      );
                    })}
                    {task.assignees.length > 3 && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: Color.borderBottomColor,
                          padding: hp(0.5),
                          borderRadius: 100,
                          marginLeft: -wp(4),
                        }}>
                        <Text
                          style={[
                            styles.remainingText,
                            {
                              color: Color.firstColor,
                              fontSize: hp(2),
                              fontFamily: Fonts.regular,
                            },
                          ]}>
                          +{task.assignees.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noTasksText}>No tasks for this project.</Text>
          )}
        </ScrollView>
        <View
          style={[
            styles.commentSection,
            {backgroundColor: theme === 'dark' ? '#222320' : '#fff'},
          ]}>
          <TextInput
            placeholder="Post a comment"
            placeholderTextColor={'gray'}
            style={[
              styles.commentInput,

              {
                color: textColor,
                backgroundColor: theme === 'dark' ? '#222320' : '#fff',
              },
            ]}
          />
          <TouchableOpacity
            style={{
              position: 'relative',
              right: wp(10),
              backgroundColor: Color.firstColor,
              padding: hp(1),
            }}>
            <PaperAirplaneIcon color={'white'} />
          </TouchableOpacity>
        </View>
        {isSheetOpen ? (
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={3}
            reducedTransparencyFallbackColor="white"
          />
        ) : (
          <></>
        )}
      </SafeAreaView>

      <UpdateStatus
        ref={updateStatusActionSheetRef}
        onClose={closeSheets}
        status={project.status}
      />
      <FileAttach ref={fileAttachActionSheetRef} onClose={closeSheets} />
      <DueDate ref={dueDateActionSheetRef} onClose={closeSheets} />
    </GestureHandlerRootView>
  );
};

export default ProjectAbout;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  projectTitle: {
    width: '75%',
    textAlign: 'center',
    fontFamily: Fonts.subHeading,
    fontSize: wp(5),
    fontFamily: Fonts.heading,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: wp(2),
  },
  detailedDescription: {
    fontFamily: Fonts.regular,
    marginBottom: hp(1),
  },
  rowContainer: {
    marginVertical: hp(0.8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(15),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    width: '30%',
  },
  text: {
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
  teamImagesContainer: {
    flexDirection: 'row',
  },
  teamMemberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: -wp(2),
  },
  PMContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    fontFamily: Fonts.regular,
  },
  button: {
    backgroundColor: Color.firstColor,
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: hp(1),
    alignItems: 'center',

    marginLeft: 5,
  },
  commentInput: {
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  tasksContainer: {
    marginBottom: 50,
  },
  taskCard: {
    backgroundColor: 'white',
    padding: hp(1),
    margin: hp(1),
    marginHorizontal: hp(0.2),
    elevation: 5,
    gap: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(1),
    paddingBottom: hp(1),
    borderBottomWidth: 1,
    borderColor: Color.borderBottomColor,
  },
  taskName: {fontFamily: Fonts.subHeading, fontSize: wp(4)},
  taskdeadline: {color: 'gray', fontFamily: Fonts.regular},
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  taskComment: {color: 'gray', fontFamily: Fonts.regular},
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginLeft: -wp(4),
  },
  noTasksText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
});
