import React, {useEffect} from 'react';
import {Header} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MAterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../../../firebase';
import {useDispatch} from 'react-redux';

/**
 * @author
 * @function StoreDetailHeader
 **/
const StoreDetailHeader = ({navigation, currentUserEmail, UserEmail}) => {
  const [chatList, setChatList] = React.useState([]);
  const dispatch = useDispatch();

//   console.log(navigation);

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
    console.log(UserEmail);
    if (!chatAlreadyExist(UserEmail)) {
      db.collection('chats')
        .add({
          users: [currentUserEmail, UserEmail],
        })
        .then(() => {
        //   console.log('here is the chat list', chatList);
          navigation.navigate('StoreChatHistory');
        });
    } else {
      navigation.navigate('StoreChatHistory');
    }
  };

  const chatAlreadyExist = recipientEmail =>
    !!chatList?.find(
      chat => chat.data.users.find(user => user === recipientEmail)?.length > 0,
    );

  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={() => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      )}
      rightComponent={() => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddReminder', UserEmail)}>
            <MAterialIcon
              name="reminder"
              size={20}
              color="white"
              style={{paddingRight: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={AddToChat}>
            <Icon name="wechat" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default StoreDetailHeader;
