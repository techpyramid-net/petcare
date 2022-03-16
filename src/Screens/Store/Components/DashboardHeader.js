import React from 'react';
import {Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {auth} from '../../../firebase';
import {useDispatch} from 'react-redux';

/**
 * @author
 * @function DashboardHeadere
 **/
const DashboardHeadere = () => {
  const dispatch = useDispatch();

  const logoutAction = async () => {
    await auth.signOut().then(user => {
      dispatch({type: 'STORE_LOGOUT'});
    });
  };

  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={{text: 'Pet Detail', style: {color: '#fff'}}}
      rightComponent={() => (
        <TouchableOpacity>
          <TouchableOpacity onPress={logoutAction}>
            <Icon name="logout" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
};

export default DashboardHeadere;
