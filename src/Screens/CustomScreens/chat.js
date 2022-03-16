import React from 'react';
import {useSelector} from 'react-redux';
import ChatHistory from './ChatHistory';

/**
 * @author
 * @function ChatComponent
 **/
const ChatComponent = ({navigation}) => {
  const {chatList} = useSelector(state => state.CustomReducer);
  const {currentUser} = useSelector(state => state.UserAuthReducer);

  return (
    <>
      {chatList?.docs.map(chat => {
        return (
          <ChatHistory
            key={chat.id}
            navigation={navigation}
            id={chat.id}
            users={chat.data().users}
            loggedInUser={currentUser[0].data.email}
          />
        );
      })}
    </>
  );
};

export default ChatComponent;
