import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

const TaskLengthContext = createContext();

export const useTaskLength = () => useContext(TaskLengthContext);

export const TaskLengthProvider = ({children}) => {
  const [todayTaskLength, setTodayTaskLength] = useState(0);

  return (
    <TaskLengthContext.Provider value={{todayTaskLength, setTodayTaskLength}}>
      {children}
    </TaskLengthContext.Provider>
  );
};
