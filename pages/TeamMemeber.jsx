import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
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
import {Color} from '../utils/colors';
import {
  ArchiveBoxIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/outline';
import {useProjects} from '../context/ProjectsContext';

const TeamMemeber = ({route}) => {
  const {projectDetail} = route.params;
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const {userDetails} = useAuth();
  const {getUserDetail} = useUsersData();
  const {projects} = useProjects();
  const [ProjectDetails, setProjectDetails] = useState({});
  const {deleteTeamMemberByNameAndId} = useProjects();
  const [teamMemberDetails, setTeamMemberDetails] = useState([]);
  const textColor = theme == 'dark' ? 'white' : 'black';
  const borderColor = theme === 'dark' ? '#2b2a2a' : '#f7efef';
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foundProject = projects.find(
      project => project.projectName === projectDetail.projectName,
    );
    setProjectDetails(foundProject);
  }, [projects, projectDetail]);

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const teamMembers = {};
        for (const member of ProjectDetails.teamMembers) {
          const userDetails = await getUserDetail(member);
          teamMembers[member] = userDetails;
        }
        setTeamMemberDetails(teamMembers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (ProjectDetails?.teamMembers?.length > 0) {
      fetchUsers();
    }
  }, [ProjectDetails]);

  const filteredUsers = Object.values(teamMemberDetails).filter(user =>
    user?.fullName?.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteMember = member => {
    deleteTeamMemberByNameAndId(projectDetail.projectName, member);
  };

  const getUserName = email => {
    const username = email.slice(0, email.indexOf('@'));
    return username;
  };

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
          Team Member
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
          placeholder="Search"
          placeholderTextColor={textColor}
          onChangeText={setSearch} // Update search state
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={textColor}
          style={{marginTop: hp(10)}}
        />
      ) : (
        <>
          <ScrollView style={styles.messagesContainer}>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <View
                  style={[styles.messageBox, {borderColor: borderColor}]}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Chat', {
                      reciever: user,
                      sender: userDetails,
                    })
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        source={{uri: user.photoURL}}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={[styles.senderName, {color: textColor}]}>
                        {user.fullName}
                      </Text>
                      <Text style={styles.messageText}>
                        {getUserName(user.email)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Chat', {
                          reciever: user,
                          sender: userDetails,
                        })
                      }>
                      <PaperAirplaneIcon color={textColor} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteMember(user.uid)}>
                      <ArchiveBoxIcon color={'red'} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text>No Team M available</Text>
            )}
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddTeamMember', {
                teamMembers: filteredUsers,
                project: projectDetail,
              })
            }
            style={{backgroundColor: Color.firstColor, paddingVertical: hp(2)}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.regular,
                fontSize: hp(3),
                color: 'white',
              }}>
              Add Member
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TeamMemeber;

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
  timeStamp: {fontSize: hp(1.5), color: 'gray', fontFamily: Fonts.regular},
  iconContainer: {
    flexDirection: 'row',
    gap: wp(4),
  },
});
