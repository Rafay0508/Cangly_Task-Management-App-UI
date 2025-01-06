import React, {useEffect, useRef, useState} from 'react';
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
  ArrowRightIcon,
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
import {useTheme} from '../context/ThemeContext';
import DocumentPicker from 'react-native-document-picker';
import {useUsersData} from '../context/UsersData';
import {useAuth} from '../context/AuthContext';
import {format, isToday, isYesterday} from 'date-fns';

const Chat = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {userDetails} = useAuth();
  const {reciever, sender} = route.params;
  const {chatData, chats, createMessage} = useUsersData();
  const scrollViewRef = useRef(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const textColor = theme === 'dark' ? 'white' : 'black';

  // Scroll to the end when the page is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
      });
      setFile(res);
      console.log('Picked document: ', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error picking document: ', err);
      }
    }
  };

  useEffect(() => {
    chatData(reciever, sender);
  }, [reciever, sender]);

  const getDateLabel = timestamp => {
    const messageDate = new Date(timestamp);

    if (isToday(messageDate)) {
      return 'Today';
    } else if (isYesterday(messageDate)) {
      return 'Yesterday';
    } else {
      return format(messageDate, 'MMMM dd, yyyy'); // Custom format for specific dates
    }
  };
  const createmessageHandler = () => {
    createMessage(reciever, sender, content);
    setContent('');
  };
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
          {!reciever.online && (
            <View style={styles.onlineStatus}>
              <View style={styles.onlineIndicator}></View>
            </View>
          )}
          <View>
            <Text style={[styles.senderName, {color: textColor}]}>
              {reciever.fullName}
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

      <ScrollView
        ref={scrollViewRef}
        style={[
          styles.messagesContainer,

          {backgroundColor: theme === 'dark' ? 'black' : 'rgb(249, 252, 253)'},
        ]}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                {
                  alignItems:
                    chat.senderUID === userDetails.uid
                      ? 'flex-end'
                      : 'flex-start',
                },
                {borderWidth: 1, borderColor: 'transparent'},
              ]}>
              <Text style={styles.timestamp}>
                {format(new Date(chat.createdAt), 'hh:mm a')}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  {
                    textAlign:
                      chat.senderUID === userDetails.uid ? 'right' : 'left',
                  },
                  {
                    backgroundColor:
                      theme === 'dark'
                        ? chat.senderUID === userDetails.uid
                          ? Color.firstColor
                          : '#222320'
                        : chat.senderUID === userDetails.uid
                        ? Color.firstColor
                        : 'white',
                    color:
                      theme === 'dark'
                        ? chat.senderUID === userDetails.uid
                          ? 'black'
                          : 'white'
                        : chat.senderUID === userDetails.uid
                        ? 'white'
                        : 'black',
                  },
                ]}>
                {chat.content}
              </Text>
            </View>
          ))
        ) : (
          <Text>no messages</Text>
        )}
      </ScrollView>

      <View
        style={[
          styles.inputContainer,
          theme === 'dark'
            ? {backgroundColor: '#222320'}
            : {backgroundColor: 'white'},
        ]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={pickDocument}>
            <PlusIcon color={textColor} />
          </TouchableOpacity>
          <LinkIcon color={textColor} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type message..."
            placeholderTextColor="gray"
            style={[styles.inputField, {color: textColor}]}
            value={content}
            onChangeText={text => setContent(text)}
          />
          <TouchableOpacity
            onPress={createmessageHandler}
            style={{backgroundColor: Color.firstColor, padding: 2}}>
            <ArrowRightIcon color="white" />
          </TouchableOpacity>
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
    backgroundColor: 'white',
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
    width: hp(5),
    height: hp(5),
    borderRadius: 25,
  },
  senderName: {
    fontFamily: Fonts.heading,
  },
  status: {
    fontFamily: Fonts.regular,
    color: Color.firstColor,
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
    paddingBottom: 20,
  },
  messageContainer: {
    paddingBottom: 8,
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
    paddingVertical: wp('4%'),
  },
  iconContainer: {
    flexDirection: 'row',
    width: '20%',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    fontFamily: Fonts.regular,
    color: 'gray',
    paddingLeft: 1,
    width: '90%',
  },
  onlineStatus: {
    position: 'absolute',
    left: hp(4.3),
    top: hp(1),
    borderRadius: 100,
    width: hp(1.5),
    height: hp(1.5),
    backgroundColor: 'rgb(255, 255, 255)',
  },
  onlineIndicator: {
    position: 'absolute',
    left: hp(0.2),
    top: hp(0.3),
    borderRadius: 100,
    width: hp(1),
    height: hp(1),
    backgroundColor: 'rgb(76,217,100)',
  },
});
