import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Color} from '../utils/colors';
import {Fonts} from '../utils/fonts';
import {useAuth} from '../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';

const EditProfile = ({visible, onClose}) => {
  const {userDetails, editProfile} = useAuth();
  const [fullName, setFullName] = useState(userDetails.fullName);
  const [photoURL, setPhotoURL] = useState(userDetails.photoURL);
  const [imageUrlLoading, setImageUrlLoading] = useState(false);

  const uploadImage = async res => {
    const data = new FormData();
    data.append('file', {
      uri: res[0].uri,
      type: res[0].type, // Adjust as necessary
      name: res[0].name,
    });
    data.append('folder', 'cangly_task_managment_app');
    data.append('upload_preset', 'jdbowltq');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dttaqjdvm/upload`,
        {
          method: 'POST',
          body: data,
        },
      );
      const result = await response.json();
      console.log(response);
      setPhotoURL(result.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const pickImage = async () => {
    setImageUrlLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // Allow image selection
      });
      await uploadImage(res); // Upload the selected image
      setImageUrlLoading(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error picking image: ', err);
      }
    }
  };

  const handleSave = async () => {
    if (userDetails.fullName === fullName) {
      Alert.alert('no chenge');
    } else {
      await editProfile(fullName, photoURL);
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Profile</Text>

          <View style={styles.formContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {imageUrlLoading ? (
                <ActivityIndicator />
              ) : (
                <Image
                  source={{uri: photoURL}}
                  style={{width: hp(10), height: hp(10), borderRadius: 100}}
                />
              )}
              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{
                    color: Color.firstColor,
                    fontSize: hp(1.8),
                    marginVertical: hp(1),
                  }}>
                  change Profile Pic
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={userDetails.email}
              editable={false}
            />
            <Text style={styles.inputLabel}>Join At</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#888"
              value={new Date(userDetails.createdAt).toLocaleDateString()}
              editable={false}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                onClose();
                setPhotoURL(userDetails.photoURL);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '90%',
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: hp(3),
    fontFamily: Fonts.heading,
    color: Color.firstColor,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: hp(2),
  },
  inputLabel: {
    textAlign: 'center',
    fontFamily: Fonts.heading,
    fontSize: hp(2),
    marginTop: hp(2),
  },
  input: {
    height: hp(6),
    borderWidth: 1,
    borderColor: Color.firstColor,
    borderRadius: 5,
    paddingLeft: wp(3),
    marginBottom: hp(1),
    fontFamily: Fonts.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: Color.firstColor,
    paddingVertical: hp(1.5),
    width: '48%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc', // Grey color for the cancel button
  },
  buttonText: {
    fontSize: hp(2),
    color: 'white',
    fontFamily: Fonts.regular,
  },
});
