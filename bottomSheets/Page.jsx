import React, {useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UpdateStatus from './UpdateStatus';

const MainPage = () => {
  const bottomSheetRef = useRef(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      {/* Reusable Bottom Sheet Component */}
      <UpdateStatus ref={bottomSheetRef} snapPoints={['40%']} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPage;
