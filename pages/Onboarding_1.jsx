import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {ArrowRightIcon} from 'react-native-heroicons/solid';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeContext';
import {Fonts} from '../utils/fonts';

const {width, height} = Dimensions.get('window');

const Onboarding_1 = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const swiperRef = useRef(null); // Reference to Swiper
  const textColor = theme === 'dark' ? 'white' : 'black'; // Text color based on theme

  const slides = [
    {
      title: 'Manage your Task\n& Projects Easily',
      description:
        'It is a long established fact that a reader \nwill be distracted by the readable content',
      image: require('../assets/onboarding-1.png'),
    },
    {
      title: 'Easier way to\nIMprove Your Skills',
      description:
        'It is a long established fact that a reader \nwill be distracted by the readable content',
      image: require('../assets/onboarding-2.png'),
    },
    {
      title: 'Collaborate with your\nTeam more Closely',
      description:
        'It is a long established fact that a reader\nwill be distracted by the readable content',
      image: require('../assets/onboarding-3.png'),
    },
  ];

  return (
    <Swiper
      loop={false}
      ref={swiperRef} // Attach the ref to Swiper
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}>
      {slides.map((slide, index) => (
        <View
          key={index}
          style={[
            styles.slide,
            theme === 'dark'
              ? {backgroundColor: 'black'}
              : {backgroundColor: 'white'},
          ]}>
          <View style={styles.subContainer}>
            <Text style={[styles.title, {color: textColor}]}>
              {slide.title}
            </Text>
            <Text style={styles.description}>{slide.description}</Text>

            {/* Add "Next" button for the first two slides */}
            {index < slides.length - 1 && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={styles.nextButtonText}>Next</Text>
                <ArrowRightIcon color={'white'} />
              </TouchableOpacity>
            )}
            {/* Add "Get Started" button on the last slide */}
            {index === slides.length - 1 && (
              <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.nextButtonText}>Get Started</Text>
                <ArrowRightIcon color={'white'} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.imageContainer}>
            <Image source={slide.image} style={styles.image} />
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  pagination: {
    bottom: '97%',
    right: '60%',
    // Position pagination on top
    zIndex: 1, // Ensures the pagination stays on top of the content
  },
  dot: {
    backgroundColor: '#ddd',
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  slide: {
    flex: 1,
    paddingVertical: hp(8),
    borderWidth: 5,
  },
  subContainer: {margin: hp(2)},
  title: {
    fontSize: 28,
    fontFamily: Fonts.subHeading,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    fontFamily: Fonts.regular,
  },
  imageContainer: {
    width: wp('90%'),
    height: hp('70%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp(2),
    marginVertical: hp(0),
    // borderWidth: 1,
  },
  image: {
    marginTop: hp(2),
    width: '90%',
    height: '85%',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#3085fe',
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(4),
    width: wp(30),
    height: wp(10),
  },
  nextButtonText: {
    color: '#fff',
    fontFamily: Fonts.heading,
    fontSize: 16,
  },

  activeDot: {
    width: 80,
    backgroundColor: '#007bff',
  },

  getStartedButton: {
    flexDirection: 'row',
    backgroundColor: '#3085fe',
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(4),
    width: wp(40),
    height: wp(14),
  },
  getStartedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Onboarding_1;
