import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomePage from './pages/WelcomePage';
import Onboarding_1 from './pages/Onboarding_1';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import VerificationPage from './pages/VerificationPage';
import NewPasswordPage from './pages/NewPasswordPage';
import MyProjectPage from './pages/MyProjectsPage';
import TodaysTasks from './pages/TodaysTasks';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Notifications from './pages/Notifications';
import SearchPage from './pages/SearchPage';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import ProjectAbout from './pages/ProjectAbout';
import TeamMemeber from './pages/TeamMemeber';
import {Text} from 'react-native';
import LoadingScreen from './components/LoadingScreen';
import AddTeamMember from './pages/AddTeamMember';

const Stack = createStackNavigator();

const AuthStackContainer = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Welcome"
      component={WelcomePage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Onboarding_1"
      component={Onboarding_1}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Login"
      component={LoginPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={RegisterPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgetPassword"
      component={ForgetPasswordPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Verification"
      component={VerificationPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="NewPassword"
      component={NewPasswordPage}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const MainStackContainer = () => (
  <Stack.Navigator initialRouteName="HomePage">
    <Stack.Screen
      name="HomePage"
      component={HomePage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="MyProjects"
      component={MyProjectPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TodaysTasks"
      component={TodaysTasks}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ProjectDetail"
      component={ProjectDetailPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Notification"
      component={Notifications}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{headerShown: false}}
    />
    <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
    <Stack.Screen
      name="ProjectAbout"
      component={ProjectAbout}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AddTeamMember"
      component={AddTeamMember}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TeamMember"
      component={TeamMemeber}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const App = () => {
  const {userDetails} = useAuth(); // Using AuthContext to get userDetails
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedDetails = await AsyncStorage.getItem('userDetails');
      if (storedDetails) {
        // console.log(storedDetails);
        // This could be used to set user details in context
      }
      setLoading(false); // Finished loading
    };
    checkUser();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return userDetails ? <MainStackContainer /> : <AuthStackContainer />;
};

export default App;
