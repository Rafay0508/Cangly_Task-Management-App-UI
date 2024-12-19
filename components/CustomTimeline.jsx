import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../context/ThemeContext';
import {useDate} from '../context/DateContext';

const CustomTimeline = ({currentDate}) => {
  const tasks = [
    // Tasks for 2024-12-19 (Today)
    {
      task_id: 1,
      task_name: 'Daily Standup Meeting',
      tasksNo: 1,
      start_time: '9:00 AM',
      end_time: '9:30 AM',
      location: 'Meeting Room A',
      priority: 'High',
      description: 'Discussing daily progress and blockers.',
      date: '2024-12-19',
      bgColor: '#87ceeb',
    },
    {
      task_id: 2,
      task_name: 'Code Review - Module A',
      tasksNo: 2,
      start_time: '10:00 AM',
      end_time: '11:00 AM',
      location: 'Online',
      priority: 'High',
      description: 'Reviewing code for the new module implementation.',
      date: '2024-12-19',
      bgColor: '#ff7e67',
    },
    {
      task_id: 3,
      task_name: 'Client Feedback Session',
      tasksNo: 1,
      start_time: '11:30 AM',
      end_time: '12:30 PM',
      location: 'Zoom',
      priority: 'High',
      description: 'Discussing feedback on the current deliverables.',
      date: '2024-12-19',
      bgColor: '#ffa07a',
    },
    {
      task_id: 4,
      task_name: 'Lunch Break',
      tasksNo: 1,
      start_time: '1:00 PM',
      end_time: '2:00 PM',
      location: 'Cafeteria',
      priority: 'Low',
      description: 'Lunch break.',
      date: '2024-12-19',
      bgColor: '#f0e68c',
    },
    {
      task_id: 5,
      task_name: 'Feature Testing - Bug Fixes',
      tasksNo: 3,
      start_time: '12:00 AM',
      end_time: '1:00 AM',
      location: 'Office',
      priority: 'Medium',
      description: 'Testing the bug fixes from the last sprint.',
      date: '2024-12-19',
      bgColor: '#90ee90',
    },
    {
      task_id: 6,
      task_name: 'Brainstorming Session - New Features',
      tasksNo: 2,
      start_time: '2:00 AM',
      end_time: '3:00 AM',
      location: 'Conference Room B',
      priority: 'Medium',
      description: 'Brainstorming ideas for upcoming features.',
      date: '2024-12-19',
      bgColor: '#d8bfd8',
    },

    // Tasks for 2024-12-20
    {
      task_id: 7,
      task_name: 'Morning Sync - Project Updates',
      tasksNo: 1,
      start_time: '12:00 AM',
      end_time: '1:00 AM',
      location: 'Meeting Room C',
      priority: 'Medium',
      description: 'Updating the team on project progress.',
      date: '2024-12-20',
      bgColor: '#87b1a3',
    },
    {
      task_id: 8,
      task_name: 'Work on Feature X',
      tasksNo: 3,
      start_time: '2:00 AM',
      end_time: '3:00 AM',
      location: 'Office',
      priority: 'Medium',
      description: 'Developing the new feature X.',
      date: '2024-12-20',
      bgColor: '#aadf94',
    },
    {
      task_id: 9,
      task_name: 'Team Lunch',
      tasksNo: 1,
      start_time: '1:00 PM',
      end_time: '2:00 PM',
      location: 'Cafeteria',
      priority: 'Low',
      description: 'Lunch with the team.',
      date: '2024-12-20',
      bgColor: '#ffdb58',
    },
    {
      task_id: 10,
      task_name: 'Sprint Retrospective',
      tasksNo: 2,
      start_time: '3:00 PM',
      end_time: '4:00 PM',
      location: 'Online',
      priority: 'High',
      description: 'Reflecting on the completed sprint.',
      date: '2024-12-20',
      bgColor: '#f4a460',
    },

    // Tasks for 2024-12-21
    {
      task_id: 11,
      task_name: 'Weekly Planning',
      tasksNo: 2,
      start_time: '12:00 AM',
      end_time: '1:00 AM',
      location: 'Conference Room A',
      priority: 'High',
      description: 'Planning tasks for the upcoming week.',
      date: '2024-12-21',
      bgColor: '#4682b4',
    },
    {
      task_id: 12,
      task_name: 'Client Call - Requirement Gathering',
      tasksNo: 2,
      start_time: '2:00 AM',
      end_time: '3:00 AM',
      location: 'Zoom',
      priority: 'Medium',
      description: 'Gathering requirements for the new project.',
      date: '2024-12-21',
      bgColor: '#9370db',
    },
    {
      task_id: 13,
      task_name: 'Feature Deployment',
      tasksNo: 2,
      start_time: '2:00 PM',
      end_time: '3:00 PM',
      location: 'Office',
      priority: 'High',
      description: 'Deploying the new feature to production.',
      date: '2024-12-21',
      bgColor: '#f08080',
    },

    // Tasks for 2024-12-22
    {
      task_id: 14,
      task_name: 'Morning Standup',
      tasksNo: 1,
      start_time: '12:00 AM',
      end_time: '1:00 AM',
      location: 'Meeting Room D',
      priority: 'Low',
      description: 'Daily team sync.',
      date: '2024-12-22',
      bgColor: '#b0c4de',
    },
    {
      task_id: 15,
      task_name: 'Testing New Features',
      tasksNo: 2,
      start_time: '2:00 AM',
      end_time: '3:00 AM',
      location: 'Office',
      priority: 'High',
      description: 'Testing features before client review.',
      date: '2024-12-22',
      bgColor: '#6b8e23',
    },
    {
      task_id: 16,
      task_name: 'Documentation Review',
      tasksNo: 1,
      start_time: '2:00 PM',
      end_time: '3:00 PM',
      location: 'Office',
      priority: 'Medium',
      description: 'Reviewing project documentation.',
      date: '2024-12-22',
      bgColor: '#8fbc8f',
    },

    // Tasks for 2024-12-23
    {
      task_id: 17,
      task_name: 'End of Year Review',
      tasksNo: 2,
      start_time: '12:00 AM',
      end_time: '1:00 AM',
      location: 'Conference Room B',
      priority: 'High',
      description: 'Reviewing the team’s annual performance.',
      date: '2024-12-23',
      bgColor: '#d3d3d3',
    },
    {
      task_id: 18,
      task_name: 'Prepare Presentation for New Year',
      tasksNo: 3,
      start_time: '2:00 AM',
      end_time: '3:00 AM',
      location: 'Office',
      priority: 'Medium',
      description: 'Preparing slides for the upcoming year’s roadmap.',
      date: '2024-12-23',
      bgColor: '#ffa500',
    },
  ];

  const {selectedDate} = useDate();

  const scrollViewRef = useRef(null);

  // Scroll to top when selectedDate changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  }, [selectedDate]);

  // Get current date in yyyy-mm-dd format for comparison
  const today = new Date().toLocaleDateString('en-CA'); // '2024-12-18'

  // Filter tasks based on selected date, ensuring no past tasks if not today
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date).toLocaleDateString('en-CA');
    const currentDateObj = new Date(selectedDate).toLocaleDateString('en-CA');
    return taskDate === currentDateObj;
  });

  // Generate time slots starting from 12:00 AM if selected date is not today
  const generateTimeSlots = () => {
    const isToday = selectedDate === today;
    const currentHour = new Date().getHours(); // Get current hour
    const startHour = isToday ? currentHour : 0; // Start from current hour if today, else from 12:00 AM
    const slots = [];

    // Generate time slots starting from the current hour if it's today
    for (let i = 0; i < 24; i++) {
      const hour = (startHour + i) % 24;
      const suffix = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      slots.push(`${formattedHour}:00 ${suffix}`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getTaskForTime = time => {
    const convertTo24Hour = time => {
      const [hour, minute] = time.split(':');
      const suffix = time.split(' ')[1];
      let newHour = parseInt(hour, 10);
      if (suffix === 'PM' && newHour !== 12) newHour += 12;
      if (suffix === 'AM' && newHour === 12) newHour = 0;
      return newHour;
    };

    const slotHour = convertTo24Hour(time);

    return filteredTasks.filter(task => {
      const taskStartHour = convertTo24Hour(task.start_time);
      const taskEndHour = convertTo24Hour(task.end_time);

      return slotHour >= taskStartHour && slotHour < taskEndHour;
    });
  };

  const handlePress = time => {
    const convertTo24Hour = time => {
      const [hour, minute] = time.split(':');
      const suffix = time.split(' ')[1];
      let newHour = parseInt(hour, 10);
      if (suffix === 'PM' && newHour !== 12) newHour += 12;
      if (suffix === 'AM' && newHour === 12) newHour = 0;
      return newHour;
    };

    const slotStartHour = convertTo24Hour(time);
    const slotEndHour = (slotStartHour + 1) % 24;

    const formatTime = hour => {
      const suffix = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:00 ${suffix}`;
    };

    const startTime = formatTime(slotStartHour);
    const endTime = formatTime(slotEndHour);

    console.log(`Start Time: ${startTime}, End Time: ${endTime}`);
  };

  const {theme} = useTheme();
  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts.subHeading,
          fontSize: hp(2.5),
          margin: hp(1.5),
          marginBottom: 0,
          color: textColor,
        }}>
        Timeline
      </Text>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}>
        {timeSlots.map((time, index) => {
          const tasksForThisTime = getTaskForTime(time);

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.timeBox,
                  theme === 'dark'
                    ? {borderBottomColor: 'rgb(56, 54, 54)'}
                    : {borderBottomColor: 'rgb(240, 233, 233)'},
                ]}
                onPress={() => handlePress(time)}
                activeOpacity={0.7}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={[styles.timeText, {color: textColor}]}>
                    {time}
                  </Text>
                </View>
                {tasksForThisTime.length > 0 ? (
                  tasksForThisTime.map(task => (
                    <View
                      key={task.task_id}
                      style={[styles.taskBox, {backgroundColor: task.bgColor}]}>
                      <Text style={styles.taskText}>{task.task_name}</Text>
                      <Text style={{color: 'white'}}>
                        {task.tasksNo} Tasks available
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Image
                          source={require('../assets/profile.jpg')}
                          style={{
                            width: hp(3),
                            height: hp(3),
                            borderRadius: 100,
                          }}
                        />
                        <Text style={{color: 'white'}}>
                          {task.start_time} - {task.end_time}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContent: {
    paddingBottom: hp(25),
  },
  timeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(12),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
  },
  timeText: {
    fontSize: hp(1.8),
    fontFamily: Fonts.regular,
  },
  taskBox: {
    marginTop: hp(0.2),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    marginHorizontal: wp(4),
    width: '80%',
    gap: hp(0.5),
  },
  taskText: {
    fontSize: hp(1.6),
    fontFamily: Fonts.subHeading,
    color: 'white',
  },
  timeUpContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  timeUpText: {
    fontSize: hp(3),
    fontFamily: Fonts.regular,
    fontWeight: 'bold',
    color: '#FF5733',
  },
});

export default CustomTimeline;
