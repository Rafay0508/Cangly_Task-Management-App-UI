import {
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
import {set} from 'date-fns';
import {useAuth} from '../context/AuthContext';
import CreateTasks from '../components/CreateTasks';
const ProjectAbout = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {project} = route.params;
  const {userDetails} = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const textColor = theme == 'dark' ? 'white' : 'black';
  const {tasksByProject, getProjectDetail} = useProjects();
  const {getUserDetail} = useUsersData();
  const [ProjectDetails, setProjectDetails] = useState(project);
  const [tasksForProject, setTasksForProject] = useState([]);
  const [projectManagerDetails, setProjectManagerDetails] = useState(null);
  const [teamMemberDetails, setTeamMemberDetails] = useState([]);
  const [assigneeDetails, setAssigneeDetails] = useState({});
  const [isSwitchOn, setIsSwitchOn] = useState(theme === 'dark');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project details
        const projectDetail = await getProjectDetail(project.projectName);
        setProjectDetails(projectDetail);

        // Fetch tasks for project
        const tasks = tasksByProject[project.projectName] || [];
        setTasksForProject(tasks);

        // Fetch project manager details
        if (project.projectManager) {
          const projectManager = await getUserDetail(project.projectManager);
          setProjectManagerDetails(projectManager);
        }

        // Fetch assignee details
        const assignees = {};
        for (const task of tasks) {
          for (const assigneeId of task.assignees) {
            if (!assignees[assigneeId]) {
              const assignee = await getUserDetail(assigneeId);
              assignees[assigneeId] = assignee;
            }
          }
        }
        setAssigneeDetails(assignees);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
      }
    };

    fetchData();
  }, [project, tasksByProject, getUserDetail, getProjectDetail]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const teamMembers = {};
        for (const member of ProjectDetails.teamMembers) {
          const userDetails = await getUserDetail(member);
          teamMembers[member] = userDetails;
        }

        setTeamMemberDetails(teamMembers);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (ProjectDetails?.teamMembers?.length > 0) {
      fetchUsers();
    }
  }, [ProjectDetails]);

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
            {ProjectDetails.description}
          </Text>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <UserGroupIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Team</Text>
              </View>
              <TouchableOpacity
                disabled={userDetails.uid != ProjectDetails.projectManager}
                onPress={() =>
                  navigation.navigate('TeamMember', {
                    projectDetail: ProjectDetails,
                  })
                }
                style={styles.teamImagesContainer}>
                {ProjectDetails.teamMembers.slice(0, 3).map((member, index) => {
                  const photoURL = teamMemberDetails[member];

                  return photoURL ? (
                    <Image
                      key={index}
                      source={{uri: photoURL.photoURL}}
                      style={styles.teamMemberImage}
                    />
                  ) : (
                    <Image
                      key={index}
                      source={require('../assets/profile.jpg')}
                      style={styles.profileImage}
                    />
                  );
                })}

                {ProjectDetails.teamMembers.length > 3 && (
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
                      +{ProjectDetails.teamMembers.length - 3}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
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
                  <Image
                    source={require('../assets/profile.jpg')}
                    style={styles.profileImage}
                  />
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
                  disabled={userDetails.uid != ProjectDetails.projectManager}
                  style={styles.button}
                  onPress={openUpdateStatusActionSheet}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: wp(3),
                      color: 'white',
                    }}>
                    {ProjectDetails.status}
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
                disabled={userDetails.uid != ProjectDetails.projectManager}
                style={styles.teamImagesContainer}
                onPress={openDueDateActionSheet}>
                <Text style={{fontFamily: Fonts.regular, color: textColor}}>
                  {ProjectDetails.dueDate}
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
                  disabled={userDetails.uid != ProjectDetails.projectManager}
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
            onPress={() => setModalVisible(true)}
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
              Add Tasks
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
                    {task.assignees.slice(0, 3).map((assigneeId, id) => {
                      const assignee = assigneeDetails[assigneeId];
                      return assignee ? (
                        <Image
                          key={id}
                          source={{uri: assignee.photoURL}}
                          style={styles.profileImage}
                        />
                      ) : (
                        <Image
                          key={id}
                          source={require('../assets/profile.jpg')}
                          style={styles.profileImage}
                        />
                      );
                    })}
                    {task.assignees.length > 3 && (
                      <View style={styles.moreParticipantsContainer}>
                        <Text style={styles.moreParticipantsText}>
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
        project={ProjectDetails}
      />
      <FileAttach ref={fileAttachActionSheetRef} onClose={closeSheets} />
      <DueDate
        ref={dueDateActionSheetRef}
        onClose={closeSheets}
        project={ProjectDetails}
      />
      <CreateTasks
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
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
