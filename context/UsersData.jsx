import {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from './AuthContext';
import database from '@react-native-firebase/database';
const UsersDataContext = createContext();

export const UsersDataProvider = ({children}) => {
  const {userDetails} = useAuth();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState({});

  try {
    database()
      .ref('users')
      .once('value', snapshot => {
        const users = snapshot.val();

        if (users) {
          // Convert the Firebase object to an array
          const usersArray = Object.values(users);

          // Filter out the user with the same UID as the logged-in user
          const filteredData = usersArray.filter(
            user => user.uid !== userDetails.uid,
          );
          setUsersData(filteredData);
        } else {
          setUsersData(null);
        }
      });
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  const chatData = (reciever, sender) => {
    const recieverUID = reciever.uid;
    const senderUID = sender.uid;

    try {
      database()
        .ref('/chats')
        .on('value', snapshot => {
          const chatData = snapshot.val();

          if (chatData) {
            // console.log(chatData);
            const filteredData = Object.keys(chatData)
              .filter(key => {
                return (
                  key === `${senderUID}__${recieverUID}` ||
                  key === `${recieverUID}__${senderUID}`
                );
              })
              .map(key => chatData[key]);
            // console.log(filteredData);

            if (filteredData.length > 0) {
              // Assuming each entry in filteredData has messages
              setChats(filteredData[0]); // Adjust this based on your data structure
            } else {
              setChats([]); // No chat found, set empty array
            }
          }
        });
    } catch (error) {}
  };

  const createMessage = async (
    sender,
    receiver,
    content,
    imageUrl = null,
    fileUrl = null,
  ) => {
    const senderUID = sender.uid; // Assuming sender is an object with a uid property
    const receiverUID = receiver.uid; // Assuming receiver is an object with a uid property

    try {
      const chatKey =
        senderUID < receiverUID
          ? `${senderUID}__${receiverUID}`
          : `${receiverUID}__${senderUID}`;

      const chatRef = database().ref(`/chats/${chatKey}`);

      // Fetch existing messages to determine the next index
      const snapshot = await chatRef.once('value');
      const existingMessages = snapshot.val() || {};

      // Find the next index based on existing keys
      const currentIndexes = Object.keys(existingMessages).map(Number);
      const nextIndex =
        currentIndexes.length > 0 ? Math.max(...currentIndexes) + 1 : 0;

      // Prepare the new message object
      const newMessage = {
        content: content,
        senderUID: receiverUID,
        receiverUID: senderUID,
        createdAt: Date.now(),
        imageUrl: imageUrl, // Include image URL if provided
        fileUrl: fileUrl, // Include file URL if provided
      };

      // Use the nextIndex as a string to avoid path errors
      await chatRef.child(nextIndex.toString()).set(newMessage);
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  return (
    <UsersDataContext.Provider
      value={{usersData, loading, chatData, chats, createMessage}}>
      {children}
    </UsersDataContext.Provider>
  );
};
export const useUsersData = () => useContext(UsersDataContext);
