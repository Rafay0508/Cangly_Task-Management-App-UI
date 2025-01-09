import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ArrowRightIcon,
  BackspaceIcon,
  ChevronLeftIcon,
  LinkIcon,
  PlusIcon,
  XCircleIcon,
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
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [imageUrlLoading, setImageUrlLoading] = useState(false);
  const [fileUrlLoading, setfileUrlLoading] = useState(false);
  const [] = useState(true);
  const textColor = theme === 'dark' ? 'white' : 'black';

  // Scroll to the end when the page is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [chats]);

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

  const uploadImage = async res => {
    const data = new FormData();
    data.append('file', {
      uri: res[0].uri,
      type: res[0].type, // Adjust as necessary
      name: res[0].name,
    });
    data.append('folder', 'cangly_task_managment_app');
    data.append('upload_preset', 'jdbowltq');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dttaqjdvm/upload`,
        {
          method: 'POST',
          body: data,
        },
      );
      const result = await response.json();

      setImageUrl(result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const pickImage = async () => {
    setImageUrlLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Allow image selection
      });
      await uploadImage(res); // Upload the selected image
      setImageUrlLoading(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error picking image: ', err);
      }
    }
  };

  const uploadFile = async res => {
    const data = new FormData();
    data.append('file', {
      uri: res[0].uri,
      type: 'image/png', // Fallback to PDF if type is not set
      name: res[0].name,
    });

    // Specify the folder where you want to store the file
    data.append('folder', 'cangly_task_managment_app/file');
    data.append('upload_preset', 'jdbowltq'); // Ensure this is set up in your Cloudinary settings

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dttaqjdvm/upload`, // Correct endpoint
        {
          method: 'POST',
          body: data,
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Response error:', errorBody);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(
        'Generated File URL: ',
        `${result.secure_url.slice(0, -3)}png`,
      );

      setFileUrl(result); // Store the result
      return result; // Return the URL for further use
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const pickFile = async () => {
    setfileUrlLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      await uploadFile(res);
      setfileUrlLoading(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error picking file: ', err);
      }
    }
  };

  const createmessageHandler = () => {
    createMessage(reciever, sender, content, imageUrl, fileUrl);
    setContent('');
    setFileUrl('');
    setImageUrl('');
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
              {chat.imageUrl && (
                <Image
                  source={{uri: chat.imageUrl.secure_url}}
                  style={{width: 200, height: 200}}
                />
              )}
              {chat.fileUrl && (
                <TouchableOpacity
                  style={[
                    styles.messageText,
                    {
                      backgroundColor:
                        theme === 'dark'
                          ? chat.senderUID === userDetails.uid
                            ? Color.firstColor
                            : '#222320'
                          : chat.senderUID === userDetails.uid
                          ? Color.firstColor
                          : 'white',
                    },
                  ]}
                  onPress={() =>
                    Linking.openURL(
                      `${chat.fileUrl.secure_url.slice(0, -3)}png`,
                    )
                  }>
                  <Text
                    style={{
                      color:
                        theme === 'dark'
                          ? chat.senderUID === userDetails.uid
                            ? 'black'
                            : 'white'
                          : chat.senderUID === userDetails.uid
                          ? 'white'
                          : 'black',
                      textDecorationLine: 'underline',
                    }}>
                    {chat.fileUrl.original_filename}.{chat.fileUrl.format}
                  </Text>
                </TouchableOpacity>
              )}

              {chat.content && (
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
              )}
            </View>
          ))
        ) : (
          <Text>No messages</Text>
        )}
      </ScrollView>
      <View style={{position: 'absolute', top: '12%', left: '10%', gap: 4}}>
        {fileUrl && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(162, 162, 162, 0.53)',
              padding: hp(2),
              borderRadius: 30,
              color: 'white',
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              file selected: {fileUrl.original_filename}.{fileUrl.format}
            </Text>
            <TouchableOpacity onPress={() => setFileUrl(null)}>
              <XCircleIcon />
            </TouchableOpacity>
          </View>
        )}

        {imageUrl && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(162, 162, 162, 0.53)',
              padding: hp(2),
              borderRadius: 30,
              color: 'white',
              justifyContent: 'space-around',
              gap: wp(4),
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Image Selected: {imageUrl.original_filename.slice(0, 10)}....
              {imageUrl.format}
            </Text>
            <TouchableOpacity onPress={() => setImageUrl(null)}>
              <XCircleIcon />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          theme === 'dark'
            ? {backgroundColor: '#222320'}
            : {backgroundColor: 'white'},
        ]}>
        <View style={styles.iconContainer}>
          {imageUrlLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <PlusIcon color={textColor} />
            </TouchableOpacity>
          )}
          {fileUrlLoading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={pickFile}>
              <LinkIcon color={textColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type message..."
            placeholderTextColor="gray"
            style={[styles.inputField, {color: textColor}]}
            value={content}
            onChangeText={text => setContent(text)}
          />
          {(imageUrl || content || fileUrl) && (
            <TouchableOpacity
              onPress={createmessageHandler}
              style={{backgroundColor: Color.firstColor, padding: 2}}>
              <ArrowRightIcon color="white" />
            </TouchableOpacity>
          )}
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
    paddingHorizontal: wp(3),
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
