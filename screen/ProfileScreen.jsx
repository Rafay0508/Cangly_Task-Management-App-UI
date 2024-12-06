import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  StarIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext';

const ProfileScreen = () => {
  const {theme} = useTheme();

  // theme Toggle
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  return (
    <View
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.image}
            resizeMode="cover" // Ensures the image covers the container area
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.name, {color: textColor}]}>Mr.Bean</Text>
          <Text style={styles.email}>beandemo@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.linkBox}>
          <Text
            style={{
              fontSize: 22,
              padding: 8,
              borderRadius: 100,
              backgroundColor: '#f7f2f2',
            }}>
            💎
          </Text>
          <Text style={{fontSize: 16, width: '60%', color: textColor}}>
            Upgrade to Premium
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox}>
          <Text
            style={{
              fontSize: 22,
              padding: 8,
              borderRadius: 100,
              backgroundColor: '#f7f2f2',
            }}>
            <ChatBubbleLeftEllipsisIcon />
          </Text>
          <Text style={{fontSize: 16, width: '60%', color: textColor}}>
            Help Center
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox}>
          <Text
            style={{
              fontSize: 22,
              padding: 8,
              borderRadius: 100,
              backgroundColor: '#f7f2f2',
            }}>
            <StarIcon />
          </Text>
          <Text style={{fontSize: 16, width: '60%', color: textColor}}>
            Rate the App
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkBox}>
          <Text
            style={{
              fontSize: 22,
              padding: 8,
              borderRadius: 100,
              backgroundColor: '#f7f2f2',
            }}>
            <EyeIcon />
          </Text>
          <Text style={{fontSize: 16, width: '60%', color: textColor}}>
            Privacy Policy
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkBox, {borderBottomWidth: 0}]}>
          <Text
            style={{
              fontSize: 22,
              padding: 8,
              borderRadius: 100,
              backgroundColor: '#f7f2f2',
            }}>
            <ArrowLeftStartOnRectangleIcon color={'#ef4c4c'} />
          </Text>
          <Text style={{fontSize: 16, width: '60%', color: '#ef4c4c'}}>
            Log out
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  detailContainer: {
    flex: 1,
    gap: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(20),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', // Fill the container completely
  },
  textContainer: {},
  name: {textAlign: 'center', fontSize: hp(2.5), fontWeight: 'semibold'},
  email: {textAlign: 'center', fontSize: hp(1.8), color: '#b6b6c1'},
  editContainer: {
    backgroundColor: '#3085fe',
    width: '90%',
    height: '15%',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 6,
  },
  editText: {textAlign: 'center', color: 'white', fontSize: 16},

  buttonsContainer: {flex: 1, top: -30},
  linkBox: {
    // display:'none',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: '#e1e1ed',
  },
});
