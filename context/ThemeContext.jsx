import React, {createContext, useState, useContext, useEffect} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext in other components
export const useTheme = () => {
  return useContext(ThemeContext);
};
