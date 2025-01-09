import React, {useEffect} from 'react';
import {AuthProvider} from './context/AuthContext';
import {ThemeProvider} from './context/ThemeContext';
import {DateProvider} from './context/DateContext';
import {TaskLengthProvider} from './context/TaskLengthContext';
import Main from './Main';
import {UsersDataProvider} from './context/UsersData';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProjectsProvider} from './context/ProjectsContext';

const App = () => {
  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedDetails = await AsyncStorage.getItem('userDetails');
      if (storedDetails) {
        console.log('aaaa', JSON.parse(storedDetails));
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <NavigationContainer>
      <AuthProvider>
        <UsersDataProvider>
          <ProjectsProvider>
            <ThemeProvider>
              <DateProvider>
                <TaskLengthProvider>
                  <Main />
                </TaskLengthProvider>
              </DateProvider>
            </ThemeProvider>
          </ProjectsProvider>
        </UsersDataProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
