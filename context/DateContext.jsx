// DateContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({children}) => {
  const [selectedDated, setSelectedDated] = useState('');

  return (
    <DateContext.Provider value={{selectedDated, setSelectedDated}}>
      {children}
    </DateContext.Provider>
  );
};
