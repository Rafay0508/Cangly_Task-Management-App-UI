import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {useUsersData} from '../context/UsersData';
import {useAuth} from '../context/AuthContext';

const messages = [
  {
    senderId: 1,
    messageId: 101,
    image: require('../assets/profile.jpg'),
    senderName: 'Leslie Alexander',
    message: 'Arigathanks',
    timeStamp: '12:40 AM',
    online: true,
  },
  {
    senderId: 2,
    messageId: 102,
    image: require('../assets/profile.jpg'),
    senderName: 'John Doe',
    message: 'Hey, are you coming to the event tomorrow?',
    timeStamp: '1:20 AM',
    online: true,
  },
  {
    senderId: 3,
    messageId: 103,
    image: require('../assets/profile.jpg'),
    senderName: 'Jane Smith',
    message: 'Can you send me the report by EOD?',
    timeStamp: '2:15 AM',
    online: false,
  },
  {
    senderId: 4,
    messageId: 104,
    image: require('../assets/profile.jpg'),
    senderName: 'Michael Brown',
    message: 'Good morning! Do you have any updates on the project?',
    timeStamp: '7:05 AM',
    online: true,
  },
  {
    senderId: 5,
    messageId: 105,
    image: require('../assets/profile.jpg'),
    senderName: 'Sarah Lee',
    message: 'Happy birthday! 🎉',
    timeStamp: '8:30 AM',
    online: true,
  },
  {
    senderId: 6,
    messageId: 106,
    image: require('../assets/profile.jpg'),
    senderName: 'David Wilson',
    message: 'Let’s grab lunch today. How about 12 PM?',
    timeStamp: '10:10 AM',
    online: true,
  },
  {
    senderId: 7,
    messageId: 107,
    image: require('../assets/profile.jpg'),
    senderName: 'Emily Davis',
    message: 'Did you get the tickets for the movie?',
    timeStamp: '11:45 AM',
    online: true,
  },
  {
    senderId: 8,
    messageId: 108,
    image: require('../assets/profile.jpg'),
    senderName: 'Chris Johnson',
    message:
      'I will be out of the office next week. Let me know if you need anything.',
    timeStamp: '12:00 PM',
    online: true,
  },
  {
    senderId: 9,
    messageId: 109,
    image: require('../assets/profile.jpg'),
    senderName: 'Alice White',
    message: 'Looking forward to the weekend trip!',
    timeStamp: '2:10 PM',
    online: true,
  },
  {
    senderId: 10,
    messageId: 110,
    image: require('../assets/profile.jpg'),
    senderName: 'Tom Harris',
    message: 'Can you send me the files for the meeting?',
    timeStamp: '3:45 PM',
    online: true,
  },
  {
    senderId: 11,
    messageId: 111,
    image: require('../assets/profile.jpg'),
    senderName: 'Rachel Green',
    message: 'Let’s catch up later this week.',
    timeStamp: '4:30 PM',
    online: true,
  },
  {
    senderId: 12,
    messageId: 112,
    image: require('../assets/profile.jpg'),
    senderName: 'Joshua King',
    message: 'Just checking in. Hope all is well!',
    timeStamp: '6:00 PM',
    online: true,
  },
  {
    senderId: 13,
    messageId: 113,
    image: require('../assets/profile.jpg'),
    senderName: 'Samantha Wright',
    message: 'I’ll see you at the gym later!',
    timeStamp: '7:15 PM',
    online: true,
  },
];

const Messages = ({placeholder = 'Search'}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {userDetails} = useAuth();
  const {usersData} = useUsersData();
  const textColor = theme == 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? '#2b2a2a' : '#f7efef'; // Border color based on theme

  return (
    <View
      style={[
        styles.container,
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <ChevronLeftIcon
            color={textColor}
            size={wp(7)}
            onPress={() => navigation.navigate('HomePage')}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            fontFamily: Fonts.subHeading,
            fontSize: wp(5),
            color: textColor,
          }}>
          Messages
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <MagnifyingGlassIcon
            size={hp(3)}
            color={textColor}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, {color: textColor}]}
          placeholder={placeholder}
          placeholderTextColor={textColor}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <AdjustmentsHorizontalIcon
            size={hp(3)}
            color={textColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {usersData ? (
          usersData.map((user, index) => (
            <TouchableOpacity
              style={[styles.messageBox, {borderColor: borderColor}]}
              key={index}
              onPress={() =>
                navigation.navigate('Chat', {
                  reciever: user,
                  sender: userDetails,
                })
              }>
              <View>
                <Image source={{uri: user.photoURL}} style={styles.image} />
                {!user.online ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: hp(4),
                      top: hp(1),
                      borderRadius: 100,
                      width: hp(1.5),
                      height: hp(1.5),
                      backgroundColor: 'rgb(255, 255, 255)',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        left: hp(0.2),
                        top: hp(0.3),
                        borderRadius: 100,
                        width: hp(1),
                        height: hp(1),
                        backgroundColor: 'rgb(76,217,100)',
                      }}></View>
                  </View>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.senderName, {color: textColor}]}>
                  {user.fullName}
                </Text>
                <Text style={styles.messageText}>click to view chat</Text>
              </View>
              <View>
                <Text style={styles.timeStamp}>00:00 AM</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>no chats avaiable</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},

  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: wp(4),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    color: '#000',
  },
  messagesContainer: {
    marginVertical: hp(2),
  },
  messageBox: {
    flexDirection: 'row',
    gap: wp(2.6),
    borderBottomWidth: 1,
    borderColor: 'pink',
    paddingVertical: hp(1.5),
  },
  image: {width: hp(5), height: hp(5), borderRadius: 25},
  textContainer: {width: '65%'},
  senderName: {fontFamily: Fonts.heading},
  messageText: {
    fontFamily: Fonts.regular,
    color: 'gray',
    marginVertical: hp(0.5),
  },
  timeStamp: {fontSize: hp(1.5), color: 'gray', fontFamily: Fonts.regular},
});
