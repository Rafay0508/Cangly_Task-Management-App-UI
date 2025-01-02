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
                (item.user1UID === senderUID || item.user1UID === recieverUID),
            );
            setChats(filteredData[0].messages);
          }
        });
    } catch (error) {}
  };

  return (
    <UsersDataContext.Provider value={{usersData, loading, chatData, chats}}>
      {children}
    </UsersDataContext.Provider>
  );
};
export const useUsersData = () => useContext(UsersDataContext);
