import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {auth, db} from '../../../../firebase';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @author
 * @function Register
 **/
const Register = () => {
  const {inputContainer, button, container} = styles;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [perHourRate, setPerHourRate] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [storename, setStoreName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            currentLocation();
          })
          .catch(err => {
            alert('please turn on the location');
          });
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const currentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setlatitude(location.latitude);
        setlongitude(location.longitude);
      })
      .catch(err => {
        console.log('error in location===>', err);
      });
  };

  const registerFunction = () => {
    // setIsRegistering(true);
    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === '' ||
      phone === '' ||
      longitude === '' ||
      latitude === '' ||
      storename === '' ||
      address === '' ||
      perHourRate === ''
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
              displayName: 'store',
            })
            .then(user => {
              // console.log(authUser);
              // AsyncStorage.setItem('loginas', 'store');

              dispatch({
                type: 'STORE_CURRENT_USER',
                payload: [
                  {
                    data: {
                      name: name,
                      email: email,
                      phone: phone,
                      storename: storename,
                      address: address,
                      perHourRate: perHourRate,
                    },
                    id: authUser.user.uid,
                  },
                ],
              });
              // console.log(authUser.user.uid);
              db.collection('storeUsers')
                .doc(authUser.user.uid)
                .set(
                  {
                    location: {
                      latitude: latitude,
                      longitude: longitude,
                    },
                    name: name,
                    email: email,
                    phone: phone,
                    storename: storename,
                    address: address,
                    perHourRate: perHourRate,
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
            placeholder="Store Name"
            value={storename}
            onChangeText={n => setStoreName(n)}
          />
          <Input
            placeholder="Per Hour Rate"
            value={perHourRate}
            onChangeText={n => setPerHourRate(n)}
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
          <Input
            placeholder="You Address"
            // secureTextEntry
            value={address}
            onChangeText={cp => setAddress(cp)}
          />
          <Button
            title="Current Location"
            containerStyle={button}
            raised
            onPress={getPermission}
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
