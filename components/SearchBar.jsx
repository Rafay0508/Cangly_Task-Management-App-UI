import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'; // Replace with your icon library
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useTheme} from '../context/ThemeContext';
const SearchBar = ({placeholder = 'Search'}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const textColor = theme == 'dark' ? 'white' : 'black';

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <MagnifyingGlassIcon
          size={hp(3.5)}
          color={textColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, {color: textColor}]}
        placeholder={placeholder}
        placeholderTextColor={textColor}
        onChangeText={setSearch}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: wp(4),
    // backgroundColor: 'white',
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
});