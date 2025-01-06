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
            console.log(chatData);
            const chatDataArray = Object.values(Object.values(chatData));

            const filteredData = chatDataArray.filter(
              item =>
                (item.user1UID === recieverUID ||
                  item.user1UID === senderUID) &&
                (item.user2UID === recieverUID || item.user2UID === senderUID),
            );
            if (filteredData.length > 0) {
              setChats(filteredData[0].messages);
            } else {
              setChats([]); // No chat found, set empty array
            }
          }
        });
    } catch (error) {}
  };

  const createMessage = async (sender, receiver, content) => {
    const senderUID = sender.uid;
    const receiverUID = receiver.uid;

    try {
      // Generate the chat key to identify the chat
      const chatKey =
        senderUID < receiverUID
          ? `${senderUID}__${receiverUID}`
          : `${receiverUID}__${senderUID}`;

      const chatRef = database().ref(`/chats/${chatKey}/messages`);

      // Prepare the new message object
      const newMessage = {
        content: content,
        senderUID: senderUID,
        receiverUID: receiverUID,
        createdAt: Date.now(),
      };

      // Push the new message to Firebase
      await chatRef.push(newMessage);
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
