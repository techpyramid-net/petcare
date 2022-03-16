import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
// import {db} from '../../firebase';
import getRecipientEmail from '../../../utils/helper';

/**
 * @author
 * @function ChatHistoryForStore
 **/

const ChatHistoryForStore = ({navigation, id, users, loggedInUser}) => {
  let recipientEmail = getRecipientEmail(users, loggedInUser);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('StoreChat', id)}>
        <ListItem bottomDivider>
          <View style={styles.UserAvatar}>
            <Text style={{textTransform: 'capitalize'}}>
              {recipientEmail[0]}
            </Text>
          </View>

          <ListItem.Content>
            <ListItem.Title>{recipientEmail}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  UserAvatar: {
    margin: 5,
    marginRight: 15,
    backgroundColor: 'whitesmoke',
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChatHistoryForStore;
