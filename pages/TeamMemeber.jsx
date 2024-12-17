import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../context/ThemeContext';
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {
  ArchiveBoxIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../utils/colors';
// import {TextInput} from 'react-native-paper';

const TeamMember = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const isDarkMode = theme === 'dark';
  const [search, setSearch] = useState('');

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <View
      style={[
        styles.container,
        theme == 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <ChevronLeftIcon color={textColor} size={wp(7)} />
        </TouchableOpacity>
        <Text style={[styles.pageTitle, {color: textColor}]}>Team Member</Text>
      </View>
      <View style={styles.searchContainer}>
        <MagnifyingGlassIcon
          size={hp(3)}
          color={textColor}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={'gray'}
          value={search}
          onChangeText={setSearch}
          accessibilityLabel="Search team members"
          returnKeyType="search"
        />
      </View>
      <ScrollView style={styles.teamContainer}>
        {/* delete extra button */}
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.teamBox}>
          <View>
            <Image
              source={require('../assets/profile.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.name, {color: textColor}]}>Jane Hawkins</Text>
            <Text style={styles.idName}>Jane_hawkins</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <PaperAirplaneIcon color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ArchiveBoxIcon color={'red'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* delete extra button */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <PlusCircleIcon color={'white'} />
          <Text style={styles.buttonText}>Add Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeamMember;

const styles = StyleSheet.create({
  container: {flex: 1, padding: hp(3)},
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(4),
  },
  pageTitle: {
    width: '80%',
    textAlign: 'center',
    fontFamily: Fonts.heading,
    fontSize: wp(5),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderWidth: 0,
    paddingHorizontal: wp(4),
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: wp(2),
  },
  input: {
    flex: 1,
    fontSize: hp(2),

    backgroundColor: 'transparent',
  },
  teamContainer: {flex: 1, marginVertical: hp(4)},
  teamBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: hp(2),
    borderColor: Color.borderBottomColor,
  },
  image: {width: hp(5), height: hp(5), borderRadius: 25},
  textContainer: {width: '70%', paddingHorizontal: wp(3)},
  name: {fontFamily: Fonts.subHeading},
  idName: {fontFamily: Fonts.regular, color: 'gray'},
  iconContainer: {
    flexDirection: 'row',
    gap: wp(4),
  },
  buttonContainer: {},
  button: {
    backgroundColor: Color.firstColor,
    padding: hp(2),
    flexDirection: 'row',
    gap: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: Fonts.regular,
    fontSize: hp(1.8),
  },
});
