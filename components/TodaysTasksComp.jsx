import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {EllipsisVerticalIcon} from 'react-native-heroicons/solid';
import {useTheme} from '../context/ThemeContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useProjects} from '../context/ProjectsContext';
import {Color} from '../utils/colors';
import {useUsersData} from '../context/UsersData';

const TodaysTasksComp = () => {
  const {theme} = useTheme();
  const {tasksForUser} = useProjects();
  const {getUserDetail} = useUsersData();
  const [loading, setLoading] = useState(true);
  const [assigneeDetails, setAssigneeDetails] = useState({}); // Store user details as a dictionary

  // Fetch tasks and assignee details
  useEffect(() => {
    if (tasksForUser.length === 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [tasksForUser]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const users = {};
      // Fetch user details for each task assignee
      for (const member of tasksForUser) {
        for (const assigneeId of member.assignees) {
          if (!users[assigneeId]) {
            const userDetail = await getUserDetail(assigneeId);
            users[assigneeId] = userDetail;
          }
        }
      }
      setAssigneeDetails(users); // Store the fetched user details
    };
    if (tasksForUser.length > 0) {
      fetchUserDetails();
    }
  }, [tasksForUser, getUserDetail]);

  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : tasksForUser.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks available</Text>
        </View>
      ) : (
        tasksForUser.map((task, index) => (
          <View
            style={[
              styles.card,
              theme === 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}
            key={index}>
            <View style={styles.header}>
              <View>
                <Text style={[styles.taskTitle, {color: textColor}]}>
                  {task.taskTitle}
                </Text>
                <Text style={styles.projectName}>{task.projectName}</Text>
              </View>
              <EllipsisVerticalIcon color={textColor} />
            </View>
            <View style={styles.taskDetails}>
              <Text style={[styles.timeText, {color: textColor}]}>
                {task.dueDate}
              </Text>
              <Text style={[styles.timeText, {color: textColor}]}>
                {task.timeline.endTime} - {task.timeline.startTime}
              </Text>
              <View style={styles.imageContainer}>
                {task.assignees.slice(0, 2).map((assigneeId, id) => {
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
      )}
    </ScrollView>
  );
};

export default TodaysTasksComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  card: {
    width: '95%',
    padding: hp(2),
    paddingTop: hp(1),
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: hp(1.5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.5),
    borderBottomWidth: 1,
    paddingVertical: hp(1),
    borderColor: '#ecefe8',
  },
  taskTitle: {
    fontFamily: Fonts.subHeading,
    fontSize: wp(4),
  },
  projectName: {
    color: '#888',
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.regular,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 20,
  },
  profileImage: {
    width: 35,
    height: 35,
    marginRight: -15,
    borderRadius: 25,
  },
  moreParticipantsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(1),
    backgroundColor: Color.borderBottomColor,
    padding: hp(1),
    borderRadius: 100,
  },
  moreParticipantsText: {
    fontSize: 12,
    color: Color.firstColor,
  },
  noTasksContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noTasksText: {
    fontSize: 18,
    color: '#777',
    fontStyle: 'italic',
  },
});
