import React, {forwardRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useTheme} from '../context/ThemeContext';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';
import {useProjects} from '../context/ProjectsContext';

const DueDate = forwardRef((props, ref) => {
  const {project} = props;
  const {updateProjectStatus} = useProjects();
  const {theme} = useTheme();

  const [todo, setTodo] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [revision, setRevision] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (project.status === 'todo') {
      setTodo(true);
    } else if (project.status === 'inProgress') {
      setInProgress(true);
    } else if (project.status === 'revision') {
      setRevision(true);
    } else if (project.status === 'completed') {
      setCompleted(true);
    }
  }, []);

  const toggleCheckbox = status => {
    setTodo(false);
    setInProgress(false);
    setRevision(false);
    setCompleted(false);

    if (status === 'todo') setTodo(true);
    if (status === 'inProgress') setInProgress(true);
    if (status === 'revision') setRevision(true);
    if (status === 'completed') setCompleted(true);

    updateProjectStatus(project.projectName, status);
    ref.current?.hide();
  };

  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <ActionSheet
      ref={ref}
      closable={false}
      onClose={props.onClose}
      backgroundInteractionEnabled={false}
      isModal={false}>
      <View style={theme === 'dark' ? {backgroundColor: 'rgb(30,40,43)'} : {}}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]}>Status</Text>
          <XCircleIcon
            onPress={() => ref.current?.hide()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>To Do</Text>
            <CheckBox
              isChecked={todo}
              onClick={() => toggleCheckbox('todo')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>
              In-Progress
            </Text>
            <CheckBox
              isChecked={inProgress}
              onClick={() => toggleCheckbox('inProgress')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.listText, {color: textColor}]}>Revision</Text>
            <CheckBox
              isChecked={revision}
              onClick={() => toggleCheckbox('revision')}
              checkBoxColor={Color.firstColor}
            />
          </View>
          <View style={[styles.listItem, {borderBottomWidth: 0}]}>
            <Text style={[styles.listText, {color: textColor}]}>Completed</Text>
            <CheckBox
              isChecked={completed}
              onClick={() => toggleCheckbox('completed')}
              checkBoxColor={Color.firstColor}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: hp(3),
  },
  headerText: {
    fontSize: hp(2.5),
    fontFamily: Fonts.heading,
  },
  icon: {
    width: 24,
    height: 24,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: hp(3),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: hp(2),
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: hp(2),
    fontFamily: Fonts.regular,
  },
});

export default DueDate;
