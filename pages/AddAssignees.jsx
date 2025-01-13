import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {useUsersData} from '../context/UsersData';
import {Color} from '../utils/colors';
import {useAuth} from '../context/AuthContext';
import {useProjects} from '../context/ProjectsContext';

const AddAssignees = ({route}) => {
  const {projectName, taskTitle, description, dueDate, status, timeline} =
    route.params;

  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {usersData} = useUsersData();
  const {addTaskToProject} = useProjects();
  const [addedMembers, setAddedMembers] = useState([]);

  const textColor = theme === 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? '#2b2a2a' : '#f7efef';

  // Filter users based on search input
  const filteredUsers = usersData?.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  const addMember = uid => {
    setAddedMembers(prev => [...prev, uid]); // Add member to the state
  };

  const removeMember = uid => {
    setAddedMembers(prev => prev.filter(id => id !== uid)); // Remove member from the state
  };
  const handleSave = async () => {
    const newTask = {
      taskTitle,
      description,
      assignees: addedMembers,
      dueDate,
      status,
      timeline,
    };

    await addTaskToProject(projectName, newTask);
    navigation.navigate('HomePage');
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? 'black' : 'white'},
      ]}>
      <View style={styles.topNavigation}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontFamily: Fonts.subHeading,
            fontSize: wp(5),
            color: textColor,
          }}>
          Add Team Member
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
          placeholder={'Search'}
          placeholderTextColor={textColor}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView style={styles.messagesContainer}>
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <View
              style={[styles.messageBox, {borderColor: borderColor}]}
              key={index}>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image source={{uri: user.photoURL}} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.senderName, {color: textColor}]}>
                    {user.fullName}
                  </Text>
                  <Text style={styles.messageText}>{user.email}</Text>
                </View>
              </View>
              <View>
                {addedMembers.includes(user.uid) ? ( // Check if user is already added
                  <TouchableOpacity
                    onPress={() => removeMember(user.uid)} // Remove member on press
                    style={{backgroundColor: 'transparent', padding: hp(2)}}>
                    <Text
                      style={{
                        borderWidth: 1,
                        padding: wp(1),
                        borderColor: Color.firstColor,
                        color: Color.firstColor,
                        fontFamily: Fonts.regular,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => addMember(user.uid)}
                    style={{backgroundColor: 'transparent', padding: hp(2)}}>
                    <Text
                      style={{
                        borderWidth: 1,
                        padding: wp(1),
                        borderColor: Color.firstColor,
                        color: Color.firstColor,
                        fontFamily: Fonts.regular,
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text>No users found</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={handleSave}
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: Color.firstColor,
          alignItems: 'center',
          justifyContent: 'center',
          padding: hp(1.5),
          gap: wp(4),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: hp(2.3),
            fontFamily: Fonts.regular,
          }}>
          Create Project
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAssignees;

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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'pink',
    paddingVertical: hp(1.5),
  },
  image: {
    width: hp(5),
    marginHorizontal: wp(1),
    height: hp(5),
    borderRadius: 25,
  },
  textContainer: {},
  senderName: {fontFamily: Fonts.heading},
  messageText: {
    fontFamily: Fonts.regular,
    color: 'gray',
    marginVertical: hp(0.5),
  },
});
