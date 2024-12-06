import {StyleSheet} from 'react-native';
import React from 'react';
import HomeScreen from '../screen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProjectsScreen from '../screen/MyProjectsScreen';
import ScheduleScreen from '../screen/ScheduleScreen';
import ProfileScreen from '../screen/ProfileScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Import Heroicons from react-native-heroicons
import {
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  CalendarDaysIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import AddNew from '../screen/AddNew';
import {useTheme} from '../context/ThemeContext';

const HomePage = () => {
  const {theme} = useTheme();
  const Tab = createBottomTabNavigator();

  // theme Toggle
  const bgColor = theme === 'dark' ? 'black' : 'white'; // Text color based on theme

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon;

          // Set the appropriate Heroicon for each tab
          if (route.name === 'Home') {
            icon = <HomeIcon size={hp(4)} color={color} />;
          } else if (route.name === 'Project') {
            icon = <ListBulletIcon size={hp(4)} color={color} />;
          } else if (route.name === 'AddNewProject') {
            icon = <PlusIcon size={hp(4)} color={color} />;
          } else if (route.name === 'Schedule') {
            icon = <CalendarDaysIcon size={hp(4)} color={color} />;
          } else if (route.name === 'Profile') {
            icon = <UserIcon size={hp(4)} color={color} />;
          }

          return icon;
        },
        tabBarLabel: () => null, // Keeps the label hidden
        tabBarStyle: {
          backgroundColor: bgColor,
          // Adjusting padding for better appearance
          paddingBottom: 10, // Reduces excessive padding
          paddingTop: 20, // Adjust the top padding if needed
          height: 80, // Set a custom height for the tab bar
        },
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
        component={AddNew}
        options={{headerShown: false}}
      />
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
  );
};

export default HomePage;

const styles = StyleSheet.create({});
