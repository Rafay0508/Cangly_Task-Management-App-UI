import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {AppState} from 'react-native';

const AppStateContext = createContext();

const AppStateProvider = ({children}) => {
  const appState = useRef(AppState.currentState); // Fixed typo "AppStateppState"

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState:', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppStateContext.Provider value={{appStateVisible}}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

export default AppStateProvider;
