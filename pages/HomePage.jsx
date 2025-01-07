import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProjectsScreen from '../screen/MyProjectsScreen';
import ScheduleScreen from '../screen/ScheduleScreen';
import ProfileScreen from '../screen/ProfileScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  CalendarDaysIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';
import {Color} from '../utils/colors';
import {BlurView} from '@react-native-community/blur';
import CreateProjectModal from '../bottomSheets/CreateProjectModal';

const HomePage = () => {
  const {theme} = useTheme();
  const Tab = createBottomTabNavigator();
  const [isModalOpen, setModelOpen] = useState(false); // State to track if sheet is open

  // Theme Toggle
  const bgColor = theme === 'dark' ? 'black' : 'white';

  const toggleModal = () => {
    setModelOpen(!isModalOpen);
  };

  return (
    <>
      <View style={[{flex: 1}]}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let icon;

              // Set the appropriate Heroicon for each tab
              if (route.name === 'Home') {
                icon = (
                  <View>
                    <Text
                      style={{
                        height: 0,
                        borderRadius: 100,
                        borderTopWidth: focused ? hp(0.4) : 0,
                        borderColor: Color.firstColor,
                      }}></Text>

                    <HomeIcon
                      style={{marginTop: hp(1)}}
                      size={hp(4)}
                      color={color}
                    />
                  </View>
                );
              } else if (route.name === 'Project') {
                icon = (
                  <View>
                    <Text
                      style={{
                        height: 0,
                        borderRadius: 100,
                        borderTopWidth: focused ? hp(0.4) : 0,
                        borderColor: Color.firstColor,
                      }}></Text>
                    <ListBulletIcon
                      style={{marginTop: hp(1)}}
                      size={hp(4)}
                      color={color}
                    />
                  </View>
                );
              } else if (route.name === 'AddNewProject') {
                icon = (
                  <View
                    style={{
                      padding: hp(2.5),
                      borderRadius: '100%',
                      backgroundColor: Color.firstColor,
                      position: 'absolute',
                      bottom: hp(2),
                    }}>
                    <PlusIcon size={hp(4)} color={'white'} />
                  </View>
                );
              } else if (route.name === 'Schedule') {
                icon = (
                  <View>
                    <Text
                      style={{
                        height: 0,
                        borderRadius: 100,
                        borderTopWidth: focused ? hp(0.4) : 0,
                        borderColor: Color.firstColor,
                      }}></Text>
                    <CalendarDaysIcon
                      style={{marginTop: hp(1)}}
                      size={hp(4)}
                      color={color}
                    />
                  </View>
                );
              } else if (route.name === 'Profile') {
                icon = (
                  <View>
                    <Text
                      style={{
                        height: 0,
                        borderRadius: 100,
                        borderTopWidth: focused ? hp(0.4) : 0,
                        borderColor: Color.firstColor,
                      }}></Text>
                    <UserIcon
                      style={{marginTop: hp(1)}}
                      size={hp(4)}
                      color={color}
                    />
                  </View>
                );
              }

              return icon;
            },
            tabBarLabel: ({focused}) => {
              // Set custom labels for each tab
              let label;
              if (route.name === 'Home') label = 'Home';
              else if (route.name === 'Project') label = 'Projects';
              else if (route.name === 'AddNewProject') label = 'New Project';
              else if (route.name === 'Schedule') label = 'Schedule';
              else if (route.name === 'Profile') label = 'Profile';
              return <Text></Text>;
            },
            tabBarStyle: {
              backgroundColor: bgColor,
              height: 60,
            },
            animation: 'shift',
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Project"
            component={MyProjectsScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="AddNewProject"
            listeners={{
              tabPress: e => {
                e.preventDefault(); // Prevent default navigation
                toggleModal();
              },
            }}
            options={{
              headerShown: false,
            }}>
            {() => null}
          </Tab.Screen>

          <Tab.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </View>
      {isModalOpen ? (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={3}
          reducedTransparencyFallbackColor="white"
        />
      ) : (
        <></>
      )}
      <CreateProjectModal isModalOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  sheetText: {
    fontSize: hp(2.5),
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
