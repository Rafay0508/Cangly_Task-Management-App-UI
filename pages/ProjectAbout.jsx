import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {useTheme} from '../context/ThemeContext';
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  StarIcon,
} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  PaperAirplaneIcon,
  PencilIcon,
  UserGroupIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import CheckBox from 'react-native-check-box';
import {Color} from '../utils/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UpdateStatus from '../bottomSheets/UpdateStatus';
import FileAttach from '../bottomSheets/FileAttach';
import DueDate from '../bottomSheets/DueDate';

const ProjectAbout = ({route}) => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {project} = route.params;

  const textColor = theme == 'dark' ? 'white' : 'black';
  const statusBottomSheetRef = useRef(null);
  const fileAttachBottomSheetRef = useRef(null);
  const dueDateBottomSheetRef = useRef(null);
  const openStatusBottomSheet = () => {
    dueDateBottomSheetRef.current?.close();
    fileAttachBottomSheetRef.current?.close();
    statusBottomSheetRef.current?.expand();
  };
  const openFileAttachBottomSheet = () => {
    statusBottomSheetRef.current?.close();
    dueDateBottomSheetRef.current?.close();
    fileAttachBottomSheetRef.current?.expand();
  };
  const dueDateAttachBottomSheet = () => {
    statusBottomSheetRef.current?.close();
    fileAttachBottomSheetRef.current?.close();
    dueDateBottomSheetRef.current?.expand();
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView
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
          <Text style={[styles.projectTitle, {color: textColor}]}>
            {project.title}
          </Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <StarIcon color={'#ffc832'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <EllipsisVerticalIcon size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={[styles.detailedDescription, {color: textColor}]}>
            {project.detailedDescription}
          </Text>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <UserGroupIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Team</Text>
              </View>
              <TouchableOpacity style={styles.teamImagesContainer}>
                {project.teamMembers.map((member, memberIndex) => (
                  <Image
                    key={memberIndex}
                    source={require('../assets/profile.jpg')}
                    style={styles.teamMemberImage}
                  />
                ))}
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <UserIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>PM</Text>
              </View>
              <View style={styles.PMContainer}>
                <Image
                  source={require('../assets/profile.jpg')}
                  style={styles.teamMemberImage}
                />
                <Text>John Stemberger</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <PencilIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Status</Text>
              </View>
              <View style={styles.teamImagesContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={openStatusBottomSheet}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: wp(3),
                      color: 'white',
                    }}>
                    To Do
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <CalendarDaysIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>Due Date</Text>
              </View>
              <TouchableOpacity
                style={styles.teamImagesContainer}
                onPress={dueDateAttachBottomSheet}>
                <Text style={{fontFamily: Fonts.regular, color: textColor}}>
                  17 Jan, 2023
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.info}>
                <ClipboardDocumentListIcon size={30} color={textColor} />
                <Text style={[styles.text, {color: textColor}]}>
                  File Attach
                </Text>
              </View>
              <View style={styles.teamImagesContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={openFileAttachBottomSheet}>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: wp(3),
                      color: 'white',
                    }}>
                    + Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              borderWidth: 1,
              padding: hp(2),
              marginVertical: hp(2),
              borderColor: 'gray',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: hp(2),
                fontFamily: Fonts.regular,

                color: Color.firstColor,
              }}>
              Add Property
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: Fonts.subHeading,
            fontSize: hp(2),
            marginBottom: hp(2),
            color: textColor,
          }}>
          Sub Tasks
        </Text>
        <ScrollView
          contentContainerStyle={{width: '100%', alignItems: 'center'}}>
          <View
            style={[
              {
                width: '100%',
                borderRadius: 10,
                padding: hp(2),
                paddingTop: hp(1),
                backgroundColor: 'white',
                elevation: 5, // For Android shadow
                shadowColor: '#000', // iOS shadow properties
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: hp(1.5),
              },
              theme == 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: hp(1.5),
                borderBottomWidth: 1,
                paddingVertical: hp(1),
                borderColor: '#d6dbd0',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.subHeading,
                    fontSize: wp(4),
                    color: textColor,
                  }}>
                  Client Review & FeedBack
                </Text>
                <Text
                  style={{
                    color: '#888',
                    fontFamily: Fonts.regular,
                    fontSize: hp(1.5),
                  }}>
                  Indeep Project Website
                </Text>
              </View>
              <CheckBox
                isChecked={true}
                onClick={() => console.log('task checked')}
                checkBoxColor={Color.firstColor}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  {fontSize: hp(1.5), color: '#333', fontFamily: Fonts.regular},
                  {color: textColor},
                ]}>
                Today 10:00 PM - 10:30 PM
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={require('../assets/profile.jpg')}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: -15,
                    borderRadius: 25,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              {
                width: '100%',
                borderRadius: 10,
                padding: hp(2),
                paddingTop: hp(1),
                backgroundColor: 'white',
                elevation: 5, // For Android shadow
                shadowColor: '#000', // iOS shadow properties
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: hp(1.5),
              },
              theme == 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: hp(1.5),
                borderBottomWidth: 1,
                paddingVertical: hp(1),
                borderColor: '#d6dbd0',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.subHeading,
                    fontSize: wp(4),
                    color: textColor,
                  }}>
                  Client Review & FeedBack
                </Text>
                <Text
                  style={{
                    color: '#888',
                    fontFamily: Fonts.regular,
                    fontSize: hp(1.5),
                  }}>
                  Indeep Project Website
                </Text>
              </View>
              <CheckBox
                isChecked={true}
                onClick={() => console.log('task checked')}
                checkBoxColor={Color.firstColor}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  {fontSize: hp(1.5), color: '#333', fontFamily: Fonts.regular},
                  {color: textColor},
                ]}>
                Today 10:00 PM - 10:30 PM
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={require('../assets/profile.jpg')}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: -15,
                    borderRadius: 25,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              {
                width: '100%',
                borderRadius: 10,
                padding: hp(2),
                paddingTop: hp(1),
                backgroundColor: 'white',
                elevation: 5, // For Android shadow
                shadowColor: '#000', // iOS shadow properties
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                marginBottom: hp(1.5),
              },
              theme == 'dark'
                ? {backgroundColor: '#222320'}
                : {backgroundColor: 'white'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: hp(1.5),
                borderBottomWidth: 1,
                paddingVertical: hp(1),
                borderColor: '#d6dbd0',
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.subHeading,
                    fontSize: wp(4),
                    color: textColor,
                  }}>
                  Client Review & FeedBack
                </Text>
                <Text
                  style={{
                    color: '#888',
                    fontFamily: Fonts.regular,
                    fontSize: hp(1.5),
                  }}>
                  Indeep Project Website
                </Text>
              </View>
              <CheckBox
                isChecked={true}
                onClick={() => console.log('task checked')}
                checkBoxColor={Color.firstColor}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  {fontSize: hp(1.5), color: '#333', fontFamily: Fonts.regular},
                  {color: textColor},
                ]}>
                Today 10:00 PM - 10:30 PM
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={require('../assets/profile.jpg')}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: -15,
                    borderRadius: 25,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.commentSection,
            {backgroundColor: theme === 'dark' ? '#222320' : '#fff'},
          ]}>
          <TextInput
            placeholder="Post a comment"
            placeholderTextColor={'gray'}
            style={[
              styles.commentInput,

              {
                color: textColor,
                backgroundColor: theme === 'dark' ? '#222320' : '#fff',
              },
            ]}
          />
          <TouchableOpacity
            style={{
              position: 'relative',
              right: wp(10),
              backgroundColor: Color.firstColor,
              padding: hp(1),
            }}>
            <PaperAirplaneIcon color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <UpdateStatus ref={statusBottomSheetRef} snapPoints={['40%']} />
      <FileAttach ref={fileAttachBottomSheetRef} snapPoints={['25%']} />
      <DueDate ref={dueDateBottomSheetRef} snapPoints={['42%']} />
    </GestureHandlerRootView>
  );
};

export default ProjectAbout;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  projectTitle: {
    width: '80%',
    textAlign: 'center',
    fontFamily: Fonts.subHeading,
    fontSize: wp(5),
    fontFamily: Fonts.heading,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: wp(2),
  },
  detailedDescription: {
    fontFamily: Fonts.regular,
    marginBottom: hp(1),
  },
  rowContainer: {
    marginVertical: hp(0.8),
    flexDirection: 'row',
    gap: wp(15),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    width: '30%',
  },
  text: {
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
  teamImagesContainer: {
    flexDirection: 'row',
  },
  teamMemberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: -wp(2),
  },
  PMContainer: {flexDirection: 'row', gap: wp(4), fontFamily: Fonts.regular},
  button: {backgroundColor: Color.firstColor, padding: hp(0.5)},
  commentSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: hp(1),
    alignItems: 'center',

    marginLeft: 5,
  },
  commentInput: {
    width: '100%',
  },
});
