import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {auth, db} from '../../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @author
 * @function Register
 **/
const Register = () => {
  const {inputContainer, button, container} = styles;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const registerFunction = () => {
    // setIsRegistering(true);
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === '' ||
      location === '' ||
      phone === ''
    ) {
      alert('all fields are required!');
    } else if (password !== confirmPassword) {
      alert('password and confirm password should same!');
    } else {
      auth
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(authUser => {
          authUser.user
            .updateProfile({
              displayName: 'user',
            })
            .then(user => {
              // console.log(authUser);
              AsyncStorage.setItem('loginas', 'user');

              dispatch({
                type: 'CURRENT_USER',
                payload: [
                  {
                    data: {
                      name: name,
                      email: email,
                      phone: phone,
                      location: location,
                    },
                    id: authUser.user.uid,
                  },
                ],
              });
              // console.log(authUser.user.uid);
              db.collection('users').doc(authUser.user.uid).set(
                {
                  name: name,
                  email: email,
                  location: location,
                  phone: phone,
                },
                {merge: true},
              );
              // setIsRegistering(false);
            });
        })
        .catch(err => {
          // setIsRegistering(false);
          alert(err.message);
          console.log('here is the error===>', err);
        });
    }
  };

  return (
    <KeyboardAvoidingView style={container}>
      <ScrollView>
        <View style={inputContainer}>
          <Input
            placeholder="Name"
            autoFocus
            value={name}
            onChangeText={n => setName(n)}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <Input
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={e => setPhone(e)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChangeText={lo => setLocation(lo)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={p => setPassword(p)}
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={cp => setConfirmPassword(cp)}
          />
          <Button
            title="Register"
            containerStyle={button}
            raised
            onPress={registerFunction}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  inputContainer: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
export default Register;
