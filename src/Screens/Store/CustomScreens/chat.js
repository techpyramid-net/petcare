import React from 'react';
import {useSelector} from 'react-redux';
import ChatHistory from './ChatHistory';

/**
 * @author
 * @function ChatComponentForStore
 **/
const ChatComponentForStore = ({navigation}) => {
  const {chatList} = useSelector(state => state.CustomReducer);
  const {currentStoreUser} = useSelector(state => state.StoreAuthReducer);

  return (
    <>
      {chatList?.docs.map(chat => {
        return (
          <ChatHistory
            key={chat.id}
            navigation={navigation}
            id={chat.id}
            users={chat.data().users}
            loggedInUser={currentStoreUser[0].data.email}
          />
        );
      })}
    </>
  );
};

export default ChatComponentForStore;
