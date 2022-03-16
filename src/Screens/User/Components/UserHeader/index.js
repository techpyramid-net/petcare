import React from 'react';
import {Header} from 'react-native-elements';

/**
 * @author
 * @function UserHeader
 **/
const UserHeader = ({title, navigation}) => {
  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={{text: `${title}`, style: {color: '#fff'}}}
      rightComponent={{
        icon: 'person',
        color: '#fff',
        onPress: () => navigation.navigate('Profile'),
      }}
    />
  );
};

export default UserHeader;
