import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
const Messages = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <ChevronLeftIcon
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
          }}>
          Messages
        </Text>
      </View>
      <View style={styles.messagesContainer}></View>
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
  messagesContainer: {},
});
