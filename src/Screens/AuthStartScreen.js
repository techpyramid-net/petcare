/* eslint-disable no-alert */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {auth, db} from '../firebase';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @author
 * @function AuthStartScreen
 **/
const AuthStartScreen = ({navigation}) => {
  const {button, container} = styles;
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const [loaderTwo, setLoaderTwo] = React.useState(false);
  const [loaderThree, setLoaderThree] = React.useState(false);
  const [isLoginByUser, setisLoginByUser] = React.useState(false);
  const [isLoginByStore, setisLoginByStore] = React.useState(false);
  const [isLoginByAdmin, setisLoginByAdmin] = React.useState(false);
  const [currentRole, setCurrentRole] = React.useState('');

  const checkCurrentUser = async (route1, role) => {
    if (role === 'user') {
      auth.onAuthStateChanged(authUser => {
        if (authUser != undefined && authUser.displayName === 'user') {
          // console.log('called', role);
          db.collection('users')
            .where('email', '==', authUser.email)
            .get()
            .then(val => {
              let getUserData = val.docs.map(doc => {
                return {id: doc.id, data: doc.data()};
              });
              dispatch({
                type: 'CURRENT_USER',
                payload: getUserData,
              });
              setLoader(false);
            });
        } else {
          setLoader(false);
          navigation.navigate(route1);
          dispatch({
            type: 'USER_SESSION_ENEDE',
          });
        }
      });
    } else if (role === 'store') {
      auth.onAuthStateChanged(authUser => {
        if (authUser != undefined && authUser.displayName === 'store') {
          // console.log('called===>', role);
          db.collection('storeUsers')
            .where('email', '==', authUser.email)
            .get()
            .then(val => {
              let getUserData = val.docs.map(doc => {
                return {id: doc.id, data: doc.data()};
              });
              dispatch({
                type: 'STORE_CURRENT_USER',
                payload: getUserData,
              });
              setLoaderThree(false);
            });
        } else {
          setLoaderThree(false);
          navigation.navigate(route1);
          dispatch({
            type: 'STORE_SESSION_ENEDE',
          });
        }
      });
    } else if (role === 'admin') {
      auth.onAuthStateChanged(authUser => {
        if (authUser != undefined && authUser.email === 'admin@gmail.com') {
          console.log(authUser.email);
          dispatch({
            type: 'ADMIN_CURRENT_USER',
          });
          setLoaderTwo(false);
        } else {
          setLoaderTwo(false);
          navigation.navigate(route1);
          dispatch({
            type: 'ADMIN_SESSION_ENEDE',
          });
        }
      });
    }
  };

  return (
    <View style={container}>
      <Button
        disabled={loader || isLoginByUser}
        title={loader ? 'checking...' : 'Go to user Auth'}
        containerStyle={button}
        raised
        onPress={async () => {
          // await AsyncStorage.setItem('role', 'user');
          checkCurrentUser('UserAuth', 'user');
        }}
      />
      <Button
        title="Go to Admin Auth"
        containerStyle={button}
        raised
        onPress={async () => {
          checkCurrentUser('AdminAuth', 'admin');
        }}
      />
      <Button
        disabled={loaderThree || isLoginByStore}
        title={loaderThree ? 'checking...' : 'Go to store Auth'}
        containerStyle={button}
        raised
        onPress={async () => {
          checkCurrentUser('StoreAuth', 'store');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
export default AuthStartScreen;
