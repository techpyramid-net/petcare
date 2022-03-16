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
      onPress={() =>
        navigation.navigate('Hired Pet', {
          data: data,
          fun: getPetRealTime,
          goBack: navigation,
        })
      }>
      <ListItem bottomDivider>
        <Avatar source={{uri: data.image}} />
        <ListItem.Content>
          <ListItem.Title>{data.name}</ListItem.Title>
          <ListItem.Subtitle>Staus: ({data.status})</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};

export default PetListForStore;
