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

const Messages = ({placeholder = 'Search'}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState(''); // Search state
  const {userDetails} = useAuth();
  const {usersData} = useUsersData();
  const textColor = theme == 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? '#2b2a2a' : '#f7efef'; // Border color based on theme

  // Filter users based on search input
  const filteredUsers = usersData?.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase()),
  );

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
          onChangeText={setSearch} // Update search state
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
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
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
                ) : null}
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
          <Text>No chats available</Text>
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
