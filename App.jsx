import React from 'react';
import {AuthProvider} from './context/AuthContext';
import {ThemeProvider} from './context/ThemeContext';
import {DateProvider} from './context/DateContext';
import {TaskLengthProvider} from './context/TaskLengthContext';
import Main from './Main';
import {UsersDataProvider} from './context/UsersData';
import database from '@react-native-firebase/database';

const App = () => {
  return (
    <AuthProvider>
      <UsersDataProvider>
        <ThemeProvider>
          <DateProvider>
            <TaskLengthProvider>
              <Main />
            </TaskLengthProvider>
          </DateProvider>
        </ThemeProvider>
      </UsersDataProvider>
    </AuthProvider>
  );
};

export default App;
