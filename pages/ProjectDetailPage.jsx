import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import {Fonts} from '../utils/fonts';
import {useTheme} from '../context/ThemeContext';
import {Color} from '../utils/colors';

const ProjectDetailPage = ({route}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {project} = route.params; // Destructure the 'project' parameter passed during navigation

  // Task data with project association
  const allTasks = [
    {
      projectId: 1,
      taskId: 1,
      taskName: 'Design homepage layout',
      status: 'In Progress',
      assignedTo: 'John Doe',
      deadline: '05 December 2022',
    },
    {
      projectId: 1,
      taskId: 2,
      taskName: 'Develop mobile navigation system',
      status: 'Pending',
      assignedTo: 'Jane Smith',
      deadline: '10 December 2022',
    },

    {
      projectId: 1,
      taskId: 3,
      taskName: 'Integrate payment gateway',
      status: 'Completed',
      assignedTo: 'Mark Lee',
      deadline: '29 September 2022',
    },
    {
      projectId: 2,
      taskId: 1,
      taskName: 'Create user registration UI',
      status: 'In Progress',
      assignedTo: 'Alice Johnson',
      deadline: '08 December 2023',
    },
    {
      projectId: 2,
      taskId: 2,
      taskName: 'Develop health data tracker feature',
      status: 'Pending',
      assignedTo: 'Bob Smith',
      deadline: '15 December 2023',
    },
    {
      projectId: 2,
      taskId: 3,
      taskName: 'Write API documentation',
      status: 'Completed',
      assignedTo: 'Charlie Brown',
      deadline: '02 December 2023',
    },
    {
      projectId: 3,
      taskId: 1,
      taskName: 'Build product listing page',
      status: 'In Progress',
      assignedTo: 'Diana White',
      deadline: '10 December 2023',
    },
    {
      projectId: 3,
      taskId: 2,
      taskName: 'Implement user authentication',
      status: 'Pending',
      assignedTo: 'Ethan Black',
      deadline: '20 December 2023',
    },
    {
      projectId: 3,
      taskId: 3,
      taskName: 'Configure shipping options',
      status: 'Completed',
      assignedTo: 'Fiona Green',
      deadline: '01 December 2023',
    },
  ];

  // Filter tasks based on the selected project
  const tasksForProject = allTasks.filter(
    task => task.projectId === project.id,
  );

  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <ScrollView
      style={[
        styles.container,
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.productDetail}>
        <View style={styles.topNavigation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('HomePage')}>
            <ChevronLeftIcon color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
            <CalendarDaysIcon color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
            <EllipsisVerticalIcon color={'white'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.projectHeader}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDate}>{project.date}</Text>
        </View>

        <View style={styles.imageContainer}>
          {project.teamMembers.map((member, index) => (
            <Image
              key={index}
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          ))}
        </View>

        <Text style={styles.projectDescription}>{project.description}</Text>
        <Text style={styles.DescriptionHeading}>Descriptions</Text>
        <Text style={styles.projectDescription}>
          {project.detailedDescription}
        </Text>

        <View style={styles.topTextContainer}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressPercentage}>{project.progress}%</Text>
        </View>

        <ProgressBar
          progress={project.progress / 100}
          color={'white'}
          style={styles.progressBar}
        />
      </View>

      <View style={styles.tasksContainer}>
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
                <CheckBox
                  isChecked={true}
                  onClick={() => console.log('task checked')}
                  checkBoxColor={Color.firstColor}
                />
                <View>
                  <Text style={[styles.taskName, {color: textColor}]}>
                    {task.taskName}
                  </Text>
                  <Text style={styles.taskdeadline}>{task.deadline}</Text>
                </View>
              </View>
              <View style={styles.taskDetails}>
                <Image
                  source={require('../assets/profile.jpg')}
                  style={styles.profileImage}
                />
                <Text style={styles.taskComment}>15 Comments</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noTasksText}>No tasks for this project.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  productDetail: {
    backgroundColor: Color.firstColor,
    paddingHorizontal: wp(4),
    paddingVertical: 10,
  },
  topNavigation: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: hp(2),
    alignItems: 'center',
  },
  backButton: {
    width: '80%',

    justifyContent: 'center',
  },
  projectHeader: {
    marginTop: hp(2),
  },
  projectTitle: {
    fontSize: hp(3),
    fontFamily: Fonts.heading,
    color: 'white',
  },
  projectDate: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: -20,
  },
  projectDescription: {
    fontFamily: Fonts.regular,
    marginTop: hp(2),
    fontSize: wp(4),
    color: 'white',
  },
  DescriptionHeading: {
    marginTop: hp(3),
    fontSize: wp(5),
    fontFamily: Fonts.regular,
    color: 'white',
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  progressText: {
    width: '50%',
    color: 'white',
    fontFamily: Fonts.regular,
  },
  progressPercentage: {
    width: '50%',
    textAlign: 'right',
    color: 'white',
    fontFamily: Fonts.regular,
  },
  progressBar: {
    marginVertical: hp(1),
    height: hp(1),
    borderRadius: 5,
    backgroundColor: '#dde0d7',
  },
  tasksContainer: {
    marginTop: hp(1),
  },
  taskCard: {
    backgroundColor: 'white',
    padding: hp(2),
    margin: hp(1),
    marginHorizontal: hp(2),
  },
  taskHeader: {
    flexDirection: 'row',
    gap: wp(4),
    marginBottom: hp(1),
  },
  taskName: {fontFamily: Fonts.subHeading, fontSize: wp(4)},
  taskdeadline: {color: 'gray', fontFamily: Fonts.regular},
  taskDetails: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginLeft: 25,
    marginVertical: 6,
  },
  taskComment: {color: 'gray', fontFamily: Fonts.regular},
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  noTasksText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProjectDetailPage;
