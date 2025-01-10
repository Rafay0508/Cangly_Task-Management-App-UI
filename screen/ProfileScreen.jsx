import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
  EyeIcon,
  StarIcon,
} from 'react-native-heroicons/outline';
import {useTheme} from '../context/ThemeContext'; // Import theme context
import {Switch} from 'react-native-paper';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import EditProfile from '../components/EditProfile';

const ProfileScreen = () => {
  const {userDetails, logOut} = useAuth();
  const {theme, toggleTheme} = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(theme === 'dark');
  const [isModalVisible, setModalVisible] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn); // Local state change
    toggleTheme(); // Update theme in context
  };

  const handleLogout = async () => {
    try {
      logOut();
      Alert.alert('Logout Sucess');
    } catch (error) {
      Alert.alert('Logout Failed', 'something went wrong');
    }
  };

  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme
  const borderColor = theme === 'dark' ? '#2b2a2a' : '#f7efef'; // Border color based on theme
  const buttonBackgroundColor = theme === 'dark' ? '#222320' : '#f7f2f2'; // Button background color based on theme
  const switchTrackColor = {false: Color.firstColor, true: Color.firstColor}; // Track color for off (blue) and on (white)
  const switchThumbColor = isSwitchOn ? 'white' : 'blue'; // Thumb color for switch

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}>
      {/* Theme toggle section */}
      <View style={styles.toggleThemeContainer}>
        <Text style={[styles.themeText, {color: textColor}]}>Dark Theme:</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          trackColor={switchTrackColor} // Track color for off (blue) and on (white)
          thumbColor={switchThumbColor} // Thumb color for on (white) and off (blue)
        />
      </View>

      {/* Profile section */}
      <View style={styles.detailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              userDetails
                ? {uri: userDetails.photoURL}
                : {uri: 'https://shorturl.at/UD9Ft'}
            }
            style={styles.image}
            resizeMode="cover" // Ensures the image covers the container area
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.name, {color: textColor}]}>
            {userDetails ? userDetails.fullName : 'unknown'}
          </Text>
          <Text style={[styles.email, {color: textColor}]}>
            {userDetails ? userDetails.email : 'unknown'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => setModalVisible(true)} // Open the modal on button press
        >
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.linkBox, {borderColor: borderColor}]}>
          <Text
            style={[styles.iconText, {backgroundColor: buttonBackgroundColor}]}>
            💎
          </Text>
          <Text style={[styles.linkText, {color: textColor}]}>
            Upgrade to Premium
          </Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkBox, {borderColor: borderColor}]}>
          <Text
            style={[styles.iconText, {backgroundColor: buttonBackgroundColor}]}>
            <ChatBubbleLeftEllipsisIcon
              size={hp(2.5)}
              color={theme === 'dark' ? 'white' : 'black'}
            />
          </Text>
          <Text style={[styles.linkText, {color: textColor}]}>Help Center</Text>
          <ChevronRightIcon color={textColor} size={hp(2.5)} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkBox, {borderColor: borderColor}]}>
          <Text
            style={[styles.iconText, {backgroundColor: buttonBackgroundColor}]}>
            <StarIcon color={theme === 'dark' ? 'white' : 'black'} />
          </Text>
          <Text style={[styles.linkText, {color: textColor}]}>
            Rate the App
          </Text>
          <ChevronRightIcon color={textColor} size={hp(2.5)} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkBox, {borderColor: borderColor}]}>
          <Text
            style={[styles.iconText, {backgroundColor: buttonBackgroundColor}]}>
            <EyeIcon color={theme === 'dark' ? 'white' : 'black'} />
          </Text>
          <Text style={[styles.linkText, {color: textColor}]}>
            Privacy Policy
          </Text>
          <ChevronRightIcon color={textColor} size={hp(2.5)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.linkBox, {borderBottomWidth: 0}]}
          onPress={handleLogout}>
          <Text
            style={[styles.iconText, {backgroundColor: buttonBackgroundColor}]}>
            <ArrowLeftStartOnRectangleIcon color={'#ef4c4c'} size={hp(2.5)} />
          </Text>
          <Text style={[styles.linkText, {color: '#ef4c4c'}]}>Log out</Text>
          <ChevronRightIcon color={textColor} />
        </TouchableOpacity>
      </View>

      {/* EditProfile Modal */}
      <EditProfile
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  darkBackground: {
    backgroundColor: 'black',
  },
  lightBackground: {
    backgroundColor: 'white',
  },
  toggleThemeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    fontFamily: Fonts.subHeading,
  },
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
    height: '100%',
  },
  textContainer: {},
  name: {
    textAlign: 'center',
    fontSize: hp(2.5),
    fontFamily: Fonts.heading,
  },
  email: {
    textAlign: 'center',
    fontSize: hp(1.8),
    color: '#b6b6c1',
    fontFamily: Fonts.regular,
  },
  editContainer: {
    backgroundColor: Color.firstColor,
    width: '90%',
    height: '15%',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: hp(1),
  },
  editText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.subHeading,
  },
  buttonsContainer: {
    flex: 1,
    top: -hp(3),
  },
  linkBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: hp(1.5),
  },
  iconText: {
    padding: hp(1),
    borderRadius: 100,
  },
  linkText: {
    fontSize: 16,
    width: '60%',
    fontFamily: Fonts.regular,
  },
});
