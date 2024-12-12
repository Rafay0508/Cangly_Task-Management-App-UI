import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FlipInYLeft} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/colors';
const WelcomePage = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate('Onboarding_1');
  }, 1500);
  return (
    <View style={styles.container}>
      <Animated.Image
        entering={FlipInYLeft.delay(400).duration(800)}
        source={require('../assets/logo-white.png')}
        style={styles.image}
      />
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.firstColor,
  },
  image: {width: wp(40), height: hp(40)},
});
