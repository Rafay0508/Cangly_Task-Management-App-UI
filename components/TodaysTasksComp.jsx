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

const TodaysTasksComp = () => {
  const {theme} = useTheme();
  const {tasksForUser} = useProjects();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (useProjects.length === 0) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [tasksForUser]);

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
                {task.timeline.endTime} -{task.timeline.startTime}
              </Text>

              <View style={styles.imageContainer}>
                <Text style={[styles.timeText, {color: textColor}]}>
                  {task.dueDate}
                </Text>
                {/* Display first 5 participants */}
                {/* {task.participants
                  .slice(0, maxParticipants)
                  .map((imageSrc, idx) => (
                    <Image
                      key={idx}
                      source={imageSrc}
                      style={styles.profileImage}
                    />
                  ))} */}
                {/* Show remaining participants count */}
                {/* {task.participants.length > maxParticipants && (
                  <View style={styles.moreParticipantsContainer}>
                    <Text style={styles.moreParticipantsText}>
                      +{task.participants.length - maxParticipants}
                    </Text>
                  </View>
                )} */}
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
    marginLeft: 20,
  },
  moreParticipantsText: {
    fontSize: 12,
    color: '#777',
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
