import React, {useEffect} from 'react';
import {Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {db} from '../../../../../firebase';
import { useDispatch } from 'react-redux';

/**
 * @author
 * @function StoreDetailHeader
 **/
const StoreDetailHeader = ({navigation, currentUserEmail, storeUserEmail}) => {
  const [chatList, setChatList] = React.useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    db.collection('chats')
      .where('users', 'array-contains', currentUserEmail)
      .onSnapshot(function (querySnapshot) {
        dispatch({
          type: 'CHAT_LIST',
          payload: querySnapshot,
        });
        setChatList(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
  }, []);

  const AddToChat = () => {
    console.log(storeUserEmail);
    if (!chatAlreadyExist(storeUserEmail)) {
      db.collection('chats')
        .add({
          users: [currentUserEmail, storeUserEmail],
        })
        .then(() => {
          console.log('here is the chat list', chatList);
          navigation.navigate('Chat History');
        });
    } else {
      navigation.navigate('Chat History');
    }
  };

  const chatAlreadyExist = recipientEmail =>
    !!chatList?.find(
      chat => chat.data.users.find(user => user === recipientEmail)?.length > 0,
    );

  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={{text: 'Store Details', style: {color: '#fff'}}}
      rightComponent={() => (
        <TouchableOpacity onPress={AddToChat}>
          <Icon name="wechat" size={20} color="white" />
        </TouchableOpacity>
      )}
    />
  );
};

export default StoreDetailHeader;
