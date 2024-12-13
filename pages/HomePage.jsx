// import React, {useRef, useMemo} from 'react';
// import {StyleSheet, Alert, View, Text} from 'react-native';
// import HomeScreen from '../screen/HomeScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MyProjectsScreen from '../screen/MyProjectsScreen';
// import ScheduleScreen from '../screen/ScheduleScreen';
// import ProfileScreen from '../screen/ProfileScreen';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {
//   HomeIcon,
//   ListBulletIcon,
//   PlusIcon,
//   CalendarDaysIcon,
//   UserIcon,
// } from 'react-native-heroicons/outline';
// import {useTheme} from '../context/ThemeContext';
// import BottomSheet from '@gorhom/bottom-sheet';
// import UpdateStatus from '../bottomSheets/UpdateStatus';
// import CreateProject from '../bottomSheets/CreateProject';

// const HomePage = () => {
//   const {theme} = useTheme();
//   const Tab = createBottomTabNavigator();

//   // Theme Toggle
//   const bgColor = theme === 'dark' ? 'black' : 'white';
//   const textColor = theme === 'dark' ? 'white' : 'black';

//   const statusBottomSheetRef = useRef(null);
//   const openStatusBottomSheet = () => {
//     statusBottomSheetRef.current?.expand();
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let icon;

//             // Set the appropriate Heroicon for each tab
//             if (route.name === 'Home') {
//               icon = <HomeIcon size={hp(4)} color={color} />;
//             } else if (route.name === 'Project') {
//               icon = <ListBulletIcon size={hp(4)} color={color} />;
//             } else if (route.name === 'AddNewProject') {
//               icon = <PlusIcon size={hp(4)} color={color} />;
//             } else if (route.name === 'Schedule') {
//               icon = <CalendarDaysIcon size={hp(4)} color={color} />;
//             } else if (route.name === 'Profile') {
//               icon = <UserIcon size={hp(4)} color={color} />;
//             }

//             return icon;
//           },
//           tabBarLabel: () => null,
//           tabBarStyle: {
//             backgroundColor: bgColor,
//             paddingBottom: 10,
//             paddingTop: 20,
//             height: 80,
//           },
//         })}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{headerShown: false}}
//         />
//         <Tab.Screen
//           name="Project"
//           component={MyProjectsScreen}
//           options={{headerShown: false}}
//         />
//         <Tab.Screen
//           name="AddNewProject"
//           listeners={{
//             tabPress: e => {
//               e.preventDefault(); // Prevent default navigation
//               openStatusBottomSheet(); // Trigger Bottom Sheet
//             },
//           }}
//           options={{
//             headerShown: false,
//           }}>
//           {() => null}
//         </Tab.Screen>

//         <Tab.Screen
//           name="Schedule"
//           component={ScheduleScreen}
//           options={{headerShown: false}}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{headerShown: false}}
//         />
//       </Tab.Navigator>

//       <CreateProject ref={statusBottomSheetRef} snapPoints={['50%']} />
//     </View>
//   );
// };

// export default HomePage;

// const styles = StyleSheet.create({
//   sheetContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   sheetText: {
//     fontSize: hp(2.5),
//     textAlign: 'center',
//   },
// });

import React, {useRef, useMemo} from 'react';
import {StyleSheet, Alert, View, Text} from 'react-native';
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
import BottomSheet from '@gorhom/bottom-sheet';
import UpdateStatus from '../bottomSheets/UpdateStatus';
import CreateProject from '../bottomSheets/CreateProject';
import {Color} from '../utils/colors';

const HomePage = () => {
  const {theme} = useTheme();
  const Tab = createBottomTabNavigator();

  // Theme Toggle
  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  const statusBottomSheetRef = useRef(null);
  const openStatusBottomSheet = () => {
    statusBottomSheetRef.current?.expand();
  };

  return (
    <View style={{flex: 1}}>
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
              icon = (
                <View
                  style={{
                    padding: hp(2.5),
                    borderRadius: '100%',
                    backgroundColor: Color.firstColor,
                    position: 'relative',
                    bottom: hp(4),
                  }}>
                  <PlusIcon size={hp(3)} color={'white'} />
                </View>
              );
            } else if (route.name === 'Schedule') {
              icon = <CalendarDaysIcon size={hp(4)} color={color} />;
            } else if (route.name === 'Profile') {
              icon = <UserIcon size={hp(4)} color={color} />;
            }

            return icon;
          },
          tabBarLabel: () => null,
          tabBarStyle: {
            backgroundColor: bgColor,
            paddingBottom: 10,
            paddingTop: 20,
            height: 80,
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
          listeners={{
            tabPress: e => {
              e.preventDefault(); // Prevent default navigation
              openStatusBottomSheet(); // Trigger Bottom Sheet
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

      <CreateProject ref={statusBottomSheetRef} snapPoints={['50%']} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sheetText: {
    fontSize: hp(2.5),
    textAlign: 'center',
  },
});
