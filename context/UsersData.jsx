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
            const chatDataArray = Object.values(chatData);
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

  const createMessage = (sender, receiver, content) => {
    const senderUID = sender.uid;
    const receiverUID = receiver.uid;
    console.log(content);

    try {
      // Check if a chat already exists between the sender and receiver
      database()
        .ref('/chats')
        .once('value', snapshot => {
          const chatData = snapshot.val();
          const chatDataArray = Object.values(chatData);

          const existingChat = chatDataArray.find(
            item =>
              (item.user1UID === senderUID && item.user2UID === receiverUID) ||
              (item.user1UID === receiverUID && item.user2UID === senderUID),
          );
          console.log(existingChat);

          // if (existingChat) {
          //   // Push the new message to the existing chat's messages array
          //   const newMessage = {
          //     content: content,
          //     senderUID: senderUID,
          //     createdAt: Date.now(),
          //   };

          // const chatRef = database().ref(
          //   `/chats/${existingChat.key}/messages`,
          // );
          // chatRef.push(newMessage); // This will add the new message to the messages array
          // } else {
          //   console.error('No existing chat found to send the message.');
          // }
        });
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
