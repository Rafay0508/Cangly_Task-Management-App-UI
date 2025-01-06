// import React, {useEffect, useRef, useState} from 'react';
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import {
//   ChevronLeftIcon,
//   LinkIcon,
//   PlusIcon,
// } from 'react-native-heroicons/solid';
// import {
//   PhoneArrowUpRightIcon,
//   VideoCameraIcon,
// } from 'react-native-heroicons/outline';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {Fonts} from '../utils/fonts';
// import {useNavigation} from '@react-navigation/native';
// import {Color} from '../utils/colors';
// import {format} from 'date-fns';
// import {useTheme} from '../context/ThemeContext';
// import DocumentPicker from 'react-native-document-picker';
// import {useUsersData} from '../context/UsersData';
// import {useAuth} from '../context/AuthContext';

// const sampleChat = [
//   {senderId: 1, message: 'Hi there!', timestamp: '2024-12-12T09:00:00Z'},
//   {
//     senderId: 2,
//     message: 'Hello! How are you?',
//     timestamp: '2024-12-12T09:01:00Z',
//   },
//   {
//     senderId: 1,
//     message: "I'm good, thanks. How about you?",
//     timestamp: '2024-12-12T09:02:00Z',
//   },
//   {
//     senderId: 2,
//     message: 'Doing well, just working on some tasks.',
//     timestamp: '2024-12-12T09:03:00Z',
//   },
//   {senderId: 1, message: 'Great to hear!', timestamp: '2024-12-12T09:04:00Z'},
//   {
//     senderId: 2,
//     message: 'What about your project?',
//     timestamp: '2024-12-12T09:05:00Z',
//   },
//   {
//     senderId: 1,
//     message: "It's going well. Just finishing some UI designs.",
//     timestamp: '2024-12-12T09:06:00Z',
//   },
//   {
//     senderId: 2,
//     message: 'Nice! Let me know if you need any help.',
//     timestamp: '2024-12-12T09:07:00Z',
//   },
//   {senderId: 1, message: 'Will do, thanks!', timestamp: '2024-12-12T09:08:00Z'},
//   {
//     senderId: 2,
//     message: 'By the way, did you check out the new framework?',
//     timestamp: '2024-12-12T09:09:00Z',
//   },
//   {
//     senderId: 1,
//     message: 'Not yet. Planning to look into it later today.',
//     timestamp: '2024-12-12T09:10:00Z',
//   },
//   {
//     senderId: 2,
//     message: 'Cool, let me know your thoughts.',
//     timestamp: '2024-12-12T09:11:00Z',
//   },
//   {senderId: 1, message: 'Sure, will do.', timestamp: '2024-12-12T09:12:00Z'},
//   {
//     senderId: 1,
//     message: 'Anyway, got to go now. Talk later?',
//     timestamp: '2024-12-12T09:13:00Z',
//   },
//   {senderId: 2, message: 'Sure, take care!', timestamp: '2024-12-12T09:14:00Z'},
// ];

// const Chat = ({route}) => {
//   const navigation = useNavigation();
//   const {theme} = useTheme();
//   const {userDetails} = useAuth();
//   const {reciever, sender} = route.params;
//   const {chatData, chats} = useUsersData();
//   const scrollViewRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const textColor = theme === 'dark' ? 'white' : 'black';

//   // Scroll to the end when the page is loaded
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (scrollViewRef.current) {
//         scrollViewRef.current.scrollToEnd({animated: true});
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, []);

//   const pickDocument = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
//       });
//       setFile(res);
//       console.log('Picked document: ', res);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User canceled the picker');
//       } else {
//         console.log('Error picking document: ', err);
//       }
//     }
//   };

//   useEffect(() => {
//     chatData(reciever, sender);
//   }, [reciever, sender]);
//   // console.log(chats);

//   return (
//     <View
//       style={[
//         styles.container,
//         theme === 'dark' ? styles.darkContainer : styles.lightContainer,
//       ]}>
//       <View style={styles.topContainer}>
//         <View style={styles.first}>
//           <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
//             <ChevronLeftIcon size={25} color={textColor} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.second}>
//           <Image
//             source={require('../assets/profile.jpg')}
//             style={styles.profileImage}
//           />
//           {!reciever.online && (
//             <View style={styles.onlineStatus}>
//               <View style={styles.onlineIndicator}></View>
//             </View>
//           )}
//           <View>
//             <Text style={[styles.senderName, {color: textColor}]}>
//               {reciever.fullName}
//             </Text>
//             <Text style={styles.status}>online now</Text>
//           </View>
//         </View>
//         <View style={styles.third}>
//           <TouchableOpacity>
//             <VideoCameraIcon size={25} color={textColor} />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <PhoneArrowUpRightIcon size={25} color={textColor} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         ref={scrollViewRef}
//         style={[
//           styles.messagesContainer,

//           {backgroundColor: theme === 'dark' ? 'black' : 'rgb(249, 252, 253)'},
//         ]}
//         contentContainerStyle={styles.scrollViewContentContainer}>
//         {chats.length > 0 ? (
//           chats.map((chat, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.messageContainer,
//                 {
//                   alignItems:
//                     chat.senderUID === userDetails.uid
//                       ? 'flex-end'
//                       : 'flex-start',
//                 },
//                 {borderWidth: 1, borderColor: 'transparent'},
//               ]}>
//               <Text style={styles.timestamp}>
//                 {format(new Date(chat.createdAt), 'hh:mm a')}
//               </Text>
//               <Text
//                 style={[
//                   styles.messageText,
//                   {
//                     textAlign:
//                       chat.senderUID === userDetails.uid ? 'right' : 'left',
//                   },
//                   {
//                     backgroundColor:
//                       theme === 'dark'
//                         ? chat.senderUID === userDetails.uid
//                           ? Color.firstColor
//                           : '#222320'
//                         : chat.senderUID === userDetails.uid
//                         ? Color.firstColor
//                         : 'white',
//                     color:
//                       theme === 'dark'
//                         ? chat.senderUID === userDetails.uid
//                           ? 'black'
//                           : 'white'
//                         : chat.senderUID === userDetails.uid
//                         ? 'white'
//                         : 'black',
//                   },
//                 ]}>
//                 {chat.content}
//               </Text>
//             </View>
//           ))
//         ) : (
//           <Text>no messages</Text>
//         )}
//       </ScrollView>

//       <View
//         style={[
//           styles.inputContainer,
//           theme === 'dark'
//             ? {backgroundColor: '#222320'}
//             : {backgroundColor: 'white'},
//         ]}>
//         <View style={styles.iconContainer}>
//           <TouchableOpacity onPress={pickDocument}>
//             <PlusIcon color={textColor} />
//           </TouchableOpacity>
//           <LinkIcon color={textColor} />
//         </View>
//         <View style={styles.inputWrapper}>
//           <TextInput
//             placeholder="Type message..."
//             placeholderTextColor="gray"
//             style={[styles.inputField, {color: textColor}]}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   darkContainer: {
//     backgroundColor: 'black',
//   },
//   lightContainer: {
//     backgroundColor: 'white',
//   },
//   topContainer: {
//     flexDirection: 'row',
//     padding: hp(2),
//     gap: wp(6),
//     alignItems: 'center',
//   },
//   first: {},
//   second: {
//     width: '60%',
//     flexDirection: 'row',
//     gap: wp(2),
//   },
//   profileImage: {
//     width: hp(5),
//     height: hp(5),
//     borderRadius: 25,
//   },
//   senderName: {
//     fontFamily: Fonts.heading,
//   },
//   status: {
//     fontFamily: Fonts.regular,
//     color: Color.firstColor,
//   },
//   third: {
//     flexDirection: 'row',
//     gap: wp(6),
//   },
//   messagesContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   scrollViewContentContainer: {
//     paddingBottom: 20,
//   },
//   messageContainer: {
//     paddingBottom: 8,
//   },
//   timestamp: {
//     textAlign: 'right',
//     fontFamily: Fonts.regular,
//     fontSize: 14,
//     marginRight: 15,
//     marginVertical: 2,
//     color: 'gray',
//   },
//   messageText: {
//     fontSize: 16,
//     padding: 10,
//     borderRadius: 25,
//     paddingHorizontal: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     width: '20%',
//     gap: 10,
//   },
//   inputWrapper: {
//     flex: 1,
//   },
//   inputField: {
//     fontFamily: Fonts.regular,
//     color: 'gray',
//     paddingLeft: 10,
//   },
//   onlineStatus: {
//     position: 'absolute',
//     left: hp(4.3),
//     top: hp(1),
//     borderRadius: 100,
//     width: hp(1.5),
//     height: hp(1.5),
//     backgroundColor: 'rgb(255, 255, 255)',
//   },
//   onlineIndicator: {
//     position: 'absolute',
//     left: hp(0.2),
//     top: hp(0.3),
//     borderRadius: 100,
//     width: hp(1),
//     height: hp(1),
//     backgroundColor: 'rgb(76,217,100)',
//   },
// });
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
  const {chatData, chats} = useUsersData();
  const scrollViewRef = useRef(null);
  const [file, setFile] = useState(null);
  const textColor = theme === 'dark' ? 'white' : 'black';

  // Scroll to the end when new messages arrive
  useEffect(() => {
    // Ensure scrolling happens on new messages or chatData changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [chats]); // Dependency on chats so that it triggers on new messages

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
          <Text style={{color: textColor}}>No messages</Text>
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
    marginBottom: 8, // Added space between messages
  },
  timestamp: {
    textAlign: 'right',
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginRight: 15,
    marginVertical: 2,
    color: 'gray',
  },
  messageText: {
    fontSize: 16,
    padding: 12,
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
