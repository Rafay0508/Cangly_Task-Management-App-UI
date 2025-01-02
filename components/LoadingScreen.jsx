import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Color} from '../utils/colors';
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-white.png')}
        style={styles.image}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.firstColor,
  },
  image: {width: wp(40), height: hp(40)},
});
