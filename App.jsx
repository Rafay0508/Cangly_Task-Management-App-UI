import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import WelcomePage from './pages/WelcomePage';
import Onboarding_1 from './pages/Onboarding_1';
import {ThemeProvider} from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import VerificationPage from './pages/VerificationPage';
import NewPasswordPage from './pages/NewPasswordPage';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
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
            name="HomePage"
            component={HomePage}
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
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
