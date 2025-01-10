import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MyProjects from '../components/MyProjects';
import {useTheme} from '../context/ThemeContext';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../utils/fonts';
import {useProjects} from '../context/ProjectsContext';
const MyProjectPage = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {projects} = useProjects();

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <View
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <View style={{flexDirection: 'row', paddingTop: hp(4)}}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <ChevronLeftIcon color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, {color: textColor}]}>My Project's</Text>
      </View>

      {/* Projects Section (Vertical Scroll) */}
      <View style={styles.projectsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {projects.map((project, index) => (
            <MyProjects
              key={index}
              isHorizontal={false}
              project={project}
              index={index}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyProjectPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    width: '80%',
    fontSize: 18,
    fontFamily: Fonts.subHeading,
    marginBottom: 10,
    textAlign: 'center',
  },
  projectsContainer: {
    flex: 1,
    marginTop: 10,
  },
});
