import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import ForgetPasswordOverLay from './ForgetPasswordOverlay';
// import {useDispatch} from 'react-redux';
import {auth, db} from '../../../firebase';

/**
 * @author
 * @function AdminAuth
 **/
const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {inputContainer, button} = styles;
  // const dispatch = useDispatch();

  const LoginFunction = async () => {
    if (email === '' || password === '') {
      alert('all fields required!');
    } else {
      await auth
        .signInWithEmailAndPassword(email.trim(), password)
        .then(user => {
          // if (user?.user.displayName === 'store') {
          //   db.collection('storeUsers')
          //     .where('email', '==', user.user.email)
          //     .get()
          //     .then(async val => {
          //       let getUserData = val.docs.map(doc => {
          //         return {id: doc.id, data: doc.data().data};
          //       });
          //       await AsyncStorage.setItem('loginas', 'store');
          //       dispatch({
          //         type: 'STORE_CURRENT_USER',
          //         payload: getUserData,
          //       });
          //     });
          // }
        })
        .catch(err => {
          alert(err.message);
          console.log('error in login', err);
        });
    }
  };

  return (
    <View style={inputContainer}>
      <Input
        placeholder="Email"
        autoFocus
        keyboardType="email-address"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={p => setPassword(p)}
      />
      <Button
        title="Login"
        containerStyle={button}
        raised
        onPress={LoginFunction}
      />
      <View>
        <ForgetPasswordOverLay />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
export default AdminAuth;
