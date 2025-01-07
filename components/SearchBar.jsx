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

  const textColor = theme === 'dark' ? 'white' : 'black';

  // Function to handle the search
  const handleSearchSubmit = () => {
    navigation.navigate('Search', {query: search});
  };

  return (
    <View
      style={[
        styles.container,
        theme === 'dark'
          ? {backgroundColor: 'black'}
          : {backgroundColor: 'white'},
      ]}>
      <TouchableOpacity onPress={handleSearchSubmit}>
        <MagnifyingGlassIcon
          size={hp(3)}
          color={textColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, {color: textColor}]}
        placeholder={placeholder}
        placeholderTextColor={'#bbbfb5'}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearchSubmit} // Handle 'Enter' key press here
        returnKeyType="search" // Change the return key to "Search"
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
    borderWidth: 0,
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
