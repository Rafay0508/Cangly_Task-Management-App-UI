import React, {useCallback, useState, forwardRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  CameraIcon,
  DocumentIcon,
  PhotoIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import {Fonts} from '../utils/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {useTheme} from '../context/ThemeContext';

const FileAttach = forwardRef(({snapPoints = ['20%']}, ref) => {
  const {theme} = useTheme();
  const handleSheetChanges = useCallback(index => {
    console.log('Bottom Sheet Index:', index);
  }, []);

  const textColor = theme == 'dark' ? 'white' : 'black';
  return (
    <BottomSheet
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      backgroundStyle={{
        backgroundColor: theme === 'dark' ? '#222320' : '#fff',
      }}>
      <BottomSheetView style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: textColor}]}>
            Attachment Files
          </Text>
          <XCircleIcon
            onPress={() => ref.current?.close()}
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
      </BottomSheetView>
    </BottomSheet>
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
    paddingVertical: hp(1),
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
    paddingVertical: hp(1),
  },
});

export default FileAttach;
