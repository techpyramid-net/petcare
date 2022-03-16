/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import {auth} from '../../../firebase';

const ForgetPasswordOverLay = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const Forget = () => {
    if (email === '') {
      alert('please enter mail');
    } else {
      try {
        auth.sendPasswordResetEmail(email.trim()).then(function (e) {
          alert('Please check your mail!');
        });
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  return (
    <View>
      <Text style={{paddingTop: 30}} onPress={toggleOverlay}>
        forget password?
      </Text>
      <Overlay
        overlayStyle={{width: '90%'}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text>Email</Text>
        <Input
          placeholder="Email"
          autoFocus
          keyboardType="email-address"
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <Button title="Reset" raised onPress={Forget} />
      </Overlay>
    </View>
  );
};

export default ForgetPasswordOverLay;
