import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {db} from '../../../firebase';
import * as firebase from 'firebase';
import {useSelector} from 'react-redux';

/**
 * @author
 * @function ChatScreenForStore
 **/
const ChatScreenForStore = ({route}) => {
  const {currentStoreUser} = useSelector(state => state.StoreAuthReducer);

  console.log(currentStoreUser[0].data);

  const [message, setMessages] = React.useState([]);
  const [input, setInput] = useState('');

  const {
    container,
    footer,
    inputStyle,
    receiverMessage,
    senderText,
    receiver,
    sender,
    senderName,
    sendByME,
  } = styles;

  // const getMessages = async () => {
  //   let ref = db.collection('chats').doc(route.params);
  //   let messagesRes = await ref
  //     .collection('messages')
  //     .orderBy('timestamp', 'asc')
  //     .get();

  //   const messages = messagesRes.docs
  //     .map(i => ({
  //       id: i.id,
  //       ...i.data(),
  //     }))
  //     .map(it => ({
  //       ...it,
  //       timestamp: it.timestamp.toDate().getTime(),
  //     }));
  //   setMessages(messages);
  // };

  // useEffect(() => {
  //   getMessages();
  // }, [route]);

  // console.log(currentUser[0]);

  
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection('chats')
      .doc(route.params)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: currentStoreUser[0].data.email,
        image: currentStoreUser[0].data.image
          ? currentStoreUser[0].data.image
          : '',
        name: currentStoreUser[0].data.name,
      });

    setInput('');
  };

  useLayoutEffect(() => {
    const messages = db
      .collection('chats')
      .doc(route.params)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );

    return messages;
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={0}
        style={container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{paddingTop: 15}}>
              {message &&
                message.map(({id, data}) => {
                  return data.user === currentStoreUser[0].data.email ? (
                    <View key={id} style={receiver}>
                      <Avatar
                        source={{
                          uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
                        }}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        rounded
                        size={30}
                        //WEB
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                      />

                      <Text style={senderText}>{data.message}</Text>
                      <Text style={sendByME}>{data.name}</Text>
                    </View>
                  ) : (
                    <View style={sender}>
                      <Avatar
                        source={{
                          uri: data.image,
                        }}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        rounded
                        size={30}
                        //WEB
                        containerStyle={{
                          position: 'absolute',
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={receiverMessage}>{data.message}</Text>
                      <Text style={senderName}>{data.name}</Text>
                    </View>
                  );
                })}
            </ScrollView>
            <View style={footer}>
              <TextInput
                placeholder="type here..."
                value={input}
                onChangeText={input => setInput(input)}
                style={inputStyle}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Icon name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  inputStyle: {
    bottom: 0,
    flex: 1,
    height: 40,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  receiverMessage: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    // marginBottom: 15,
  },
  receiver: {
    padding: 15,
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    backgroundColor: '#2B68E6',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sendByME: {
    left: 10,
    // paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
});
export default ChatScreenForStore;
