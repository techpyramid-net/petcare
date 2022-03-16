import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

/**
 * @author
 * @function PetListForStore
 **/

const PetListForStore = ({data, navigation, getPetRealTime}) => {
  return (
    <TouchableOpacity
    //   onPress={() =>
    //     navigation.navigate('Hired Pet', {
    //       data: data,
    //       fun: getPetRealTime,
    //       goBack: navigation,
    //     })
    //   }
    >
      <ListItem bottomDivider>
        <Avatar
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWepdiRPynmsx7AX5Fh-nV0PlxjwrnOAbArpz4ZrcdLLM0CEgZEdJVdDQV5VkhahSzU9o&usqp=CAU',
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{data.storename}</ListItem.Title>
          <ListItem.Subtitle>Email: ({data.email})</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};

export default PetListForStore;
