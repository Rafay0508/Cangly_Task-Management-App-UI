import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ChevronLeftIcon,
  LinkIcon,
  PlusIcon,
} from 'react-native-heroicons/solid';
import {
  PhoneArrowUpRightIcon,
  VideoCameraIcon,
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../utils/colors';
import {format} from 'date-fns';
import {useTheme} from '../context/ThemeContext';

const chatData = [
  {senderId: 1, message: 'Hi there!', timestamp: '2024-12-12T09:00:00Z'},
  {
    senderId: 2,
    message: 'Hello! How are you?',
    timestamp: '2024-12-12T09:01:00Z',
  },
  {
    senderId: 1,
    message: "I'm good, thanks. How about you?",
    timestamp: '2024-12-12T09:02:00Z',
  },
  {
    senderId: 2,
    message: 'Doing well, just working on some tasks.',
    timestamp: '2024-12-12T09:03:00Z',
  },
  {senderId: 1, message: 'Great to hear!', timestamp: '2024-12-12T09:04:00Z'},
  {
    senderId: 2,
    message: 'What about your project?',
    timestamp: '2024-12-12T09:05:00Z',
  },
  {
    senderId: 1,
    message: "It's going well. Just finishing some UI designs.",
    timestamp: '2024-12-12T09:06:00Z',
  },
  {
    senderId: 2,
    message: 'Nice! Let me know if you need any help.',
    timestamp: '2024-12-12T09:07:00Z',
  },
  {senderId: 1, message: 'Will do, thanks!', timestamp: '2024-12-12T09:08:00Z'},
  {
    senderId: 2,
    message: 'By the way, did you check out the new framework?',
    timestamp: '2024-12-12T09:09:00Z',
  },
  {
    senderId: 1,
    message: 'Not yet. Planning to look into it later today.',
    timestamp: '2024-12-12T09:10:00Z',
  },
  {
    senderId: 2,
    message: 'Cool, let me know your thoughts.',
    timestamp: '2024-12-12T09:11:00Z',
  },
  {senderId: 1, message: 'Sure, will do.', timestamp: '2024-12-12T09:12:00Z'},
  {
    senderId: 1,
    message: 'Anyway, got to go now. Talk later?',
    timestamp: '2024-12-12T09:13:00Z',
  },
  {senderId: 2, message: 'Sure, take care!', timestamp: '2024-12-12T09:14:00Z'},
];

const Chat = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {sender} = route.params;
  const scrollViewRef = useRef(null); // reference for ScrollView
  console.log(theme);
  // Scroll to the end when the page is loaded
  useEffect(() => {
    // Delaying the scroll to ensure the scroll view is fully rendered
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 300); // delay in milliseconds (adjust this as necessary)

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Empty dependency array means it runs once when the component mounts

  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <View
      style={[
        styles.container,
        theme === 'dark' ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View style={styles.topContainer}>
        <View style={styles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
            <ChevronLeftIcon size={25} color={textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.second}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.senderName, {color: textColor}]}>
              {sender.senderName}
            </Text>
            <Text style={styles.status}>online now</Text>
          </View>
        </View>
        <View style={styles.third}>
          <TouchableOpacity>
            <VideoCameraIcon size={25} color={textColor} />
          </TouchableOpacity>
          <TouchableOpacity>
            <PhoneArrowUpRightIcon size={25} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages Container */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {chatData.map((chat, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {alignItems: chat.senderId === 1 ? 'flex-end' : 'flex-start'},
            ]}>
            <Text style={styles.timestamp}>
              {format(new Date(chat.timestamp), 'hh:mm a')}
            </Text>
            <Text
              style={[
                styles.messageText,
                {textAlign: chat.senderId === 1 ? 'right' : 'left'},
                {
                  backgroundColor:
                    chat.senderId === 1 ? Color.firstColor : 'white',
                  color: chat.senderId === 1 ? 'white' : 'black',
                },
              ]}>
              {chat.message}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input Container */}
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <PlusIcon color={textColor} />
          <LinkIcon color={textColor} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type message..."
            placeholderTextColor={'gray'}
            style={[styles.inputField, {color: textColor}]}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: 'f8fbff',
  },
  topContainer: {
    flexDirection: 'row',
    padding: hp(2),
    gap: wp(6),
    alignItems: 'center',
  },
  first: {},
  second: {
    width: '60%',
    flexDirection: 'row',
    gap: wp(2),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  senderName: {
    fontFamily: Fonts.heading,
  },
  status: {
    fontFamily: Fonts.regular,
    color: 'green',
  },
  third: {
    flexDirection: 'row',
    gap: wp(6),
  },
  messagesContainer: {
    flex: 1,

    padding: 10,
  },
  scrollViewContentContainer: {
    paddingBottom: 20, // Add padding to avoid the last message being cut off
  },
  messageContainer: {
    marginBottom: 8,
  },
  timestamp: {
    textAlign: 'right',
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginRight: 15,
    marginVertical: 2,
    color: 'gray',
  },
  messageText: {
    fontSize: 16,
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    width: '20%',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  inputField: {
    fontFamily: Fonts.regular,
    color: 'gray',

    paddingLeft: 10,
  },
});
