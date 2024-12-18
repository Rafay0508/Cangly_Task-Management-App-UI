import React, {useRef, useMemo, useState} from 'react';
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
// import BottomSheet from '@gorhom/bottom-sheet';
import UpdateStatus from '../bottomSheets/UpdateStatus';
import CreateProject from '../bottomSheets/CreateProject';
import {Color} from '../utils/colors';
import {BlurView} from '@react-native-community/blur';

const HomePage = () => {
  const {theme} = useTheme();
  const Tab = createBottomTabNavigator();
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to track if sheet is open

  // Theme Toggle
  const bgColor = theme === 'dark' ? 'black' : 'white';
  const textColor = theme === 'dark' ? 'white' : 'black';

  const updateStatusActionSheetRef = useRef(null);
  const openUpdateStatusActionSheet = () => {
    setIsSheetOpen(true);
    updateStatusActionSheetRef.current?.show();
  };
  const closeSheets = () => {
    setIsSheetOpen(false);
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
                      position: 'absolute',
                      bottom: hp(2),
                    }}>
                    <PlusIcon size={hp(4)} color={'white'} />
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
                openUpdateStatusActionSheet();
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
      <CreateProject ref={updateStatusActionSheetRef} onClose={closeSheets} />
    </>
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
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

// WITHOUT TAB ACTIVE BGCOLOR

// import React, {useRef, useMemo, useState} from 'react';
// import {StyleSheet, Alert, View, Text, TouchableOpacity} from 'react-native';
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
// // import BottomSheet from '@gorhom/bottom-sheet';
// import UpdateStatus from '../bottomSheets/UpdateStatus';
// import CreateProject from '../bottomSheets/CreateProject';
// import {Color} from '../utils/colors';
// import {BlurView} from '@react-native-community/blur';

// const HomePage = () => {
//   const {theme} = useTheme();
//   const Tab = createBottomTabNavigator();
//   const [isSheetOpen, setIsSheetOpen] = useState(false); // State to track if sheet is open

//   // Theme Toggle
//   const bgColor = theme === 'dark' ? 'black' : 'white';
//   const textColor = theme === 'dark' ? 'white' : 'black';

//   const updateStatusActionSheetRef = useRef(null);
//   const openUpdateStatusActionSheet = () => {
//     setIsSheetOpen(true);
//     updateStatusActionSheetRef.current?.show();
//   };
//   const closeSheets = () => {
//     setIsSheetOpen(false);
//   };
//   return (
//     <>
//       <View style={[{flex: 1}]}>
//         <Tab.Navigator
//           screenOptions={({route}) => ({
//             tabBarIcon: ({focused, color, size}) => {
//               let icon;

//               // Set the appropriate Heroicon for each tab
//               if (route.name === 'Home') {
//                 icon = (
//                   <View style={{marginTop: hp(3)}}>
//                     <HomeIcon size={hp(4)} color={color} />
//                   </View>
//                 );
//               } else if (route.name === 'Project') {
//                 icon = (
//                   <View style={{marginTop: hp(3)}}>
//                     <ListBulletIcon size={hp(4)} color={color} />
//                   </View>
//                 );
//               } else if (route.name === 'AddNewProject') {
//                 icon = (
//                   <View
//                     style={{
//                       padding: hp(2.5),
//                       borderRadius: '100%',
//                       backgroundColor: Color.firstColor,
//                       position: 'absolute',
//                       bottom: hp(2),
//                     }}>
//                     <PlusIcon size={hp(4)} color={'white'} />
//                   </View>
//                 );
//               } else if (route.name === 'Schedule') {
//                 icon = (
//                   <View style={{marginTop: hp(3)}}>
//                     <CalendarDaysIcon size={hp(4)} color={color} />
//                   </View>
//                 );
//               } else if (route.name === 'Profile') {
//                 icon = (
//                   <View style={{marginTop: hp(3)}}>
//                     <UserIcon size={hp(4)} color={color} />
//                   </View>
//                 );
//               }

//               return icon;
//             },
//             tabBarLabel: () => null,
//             tabBarStyle: {height: 80},
//             animation: 'fade',
//           })}>
//           <Tab.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               headerShown: false,
//               tabBarItemStyle: {backgroundColor: 'white'},
//               tabBarActiveTintColor: Color.firstColor,
//             }}
//           />
//           <Tab.Screen
//             name="Project"
//             component={MyProjectsScreen}
//             options={{
//               headerShown: false,
//               tabBarItemStyle: {backgroundColor: 'white'},
//               tabBarActiveTintColor: Color.firstColor,
//             }}
//           />
//           <Tab.Screen
//             name="AddNewProject"
//             listeners={{
//               tabPress: e => {
//                 e.preventDefault(); // Prevent default navigation
//                 openUpdateStatusActionSheet();
//               },
//             }}
//             options={{
//               headerShown: false,
//               tabBarItemStyle: {backgroundColor: 'white'},
//               tabBarActiveTintColor: Color.firstColor,
//             }}>
//             {() => null}
//           </Tab.Screen>

//           <Tab.Screen
//             name="Schedule"
//             component={ScheduleScreen}
//             options={{
//               headerShown: false,
//               tabBarItemStyle: {backgroundColor: 'white'},
//               tabBarActiveTintColor: Color.firstColor,
//             }}
//           />
//           <Tab.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{
//               headerShown: false,
//               tabBarItemStyle: {backgroundColor: 'white'},
//               tabBarActiveTintColor: Color.firstColor,
//             }}
//           />
//         </Tab.Navigator>
//       </View>
//       {isSheetOpen ? (
//         <BlurView
//           style={styles.absolute}
//           blurType="light"
//           blurAmount={3}
//           reducedTransparencyFallbackColor="white"
//         />
//       ) : (
//         <></>
//       )}
//       <CreateProject ref={updateStatusActionSheetRef} onClose={closeSheets} />
//     </>
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
//   absolute: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
