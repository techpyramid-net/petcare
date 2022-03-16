import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {auth} from '../../../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @author
 * @function ProfileHeader
 **/

const ProfileHeader = ({navigation}) => {
  const dispatch = useDispatch();

  const logoutAction = async () => {
    AsyncStorage.removeItem('loginas');
    await auth.signOut().then(user => {
      dispatch({type: 'LOGOUT'});
    });
  };

  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={() => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      )}
      centerComponent={{text: 'Profile', style: {color: '#fff'}}}
      rightComponent={() => (
        <TouchableOpacity onPress={logoutAction}>
          <Icon name="logout" size={20} color="white" />
        </TouchableOpacity>
      )}
    />
  );
};

export default ProfileHeader;
