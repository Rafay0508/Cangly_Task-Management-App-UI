import React, {forwardRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useTheme} from '../context/ThemeContext';
import {
  CameraIcon,
  DocumentIcon,
  PhotoIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {Color} from '../utils/colors';

// Forward the ref directly to ActionSheet component
const FileAttach = forwardRef((props, ref) => {
  const {theme} = useTheme();
  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <ActionSheet
      ref={ref}
      closable={false}
      onClose={props.onClose}
      backgroundInteractionEnabled={false}
      isModal={false}>
      <View style={theme == 'dark' ? {backgroundColor: 'rgb(30,40,43)'} : {}}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]}>
            Attachment Files
          </Text>

          <XCircleIcon
            onPress={() => ref.current?.hide()}
            style={styles.icon}
            size={hp(3)}
            color={textColor}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              gap: hp(1),
              backgroundColor: theme == 'dark' ? '#272D36' : '#f5f9ff',
              padding: 10,
            }}>
            <DocumentIcon color={Color.firstColor} />
            <Text style={{fontFamily: Fonts.regular, color: textColor}}>
              Document
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              gap: hp(1),
              backgroundColor: theme == 'dark' ? '#272D36' : '#f5f9ff',
              padding: 10,
            }}>
            <CameraIcon color={Color.firstColor} />
            <Text style={{fontFamily: Fonts.regular, color: textColor}}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              gap: hp(1),
              backgroundColor: theme == 'dark' ? '#272D36' : '#f5f9ff',
              padding: 10,
            }}>
            <PhotoIcon color={Color.firstColor} />
            <Text style={{fontFamily: Fonts.regular, color: textColor}}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
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
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: hp(5),
  },
});

export default FileAttach;
