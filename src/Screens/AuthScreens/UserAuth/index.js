/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Tab} from 'react-native-elements';
import Login from './Components/Login';
import Register from './Components/Signup';

/**
 * @author
 * @function UserAuth
 **/
const UserAuth = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeTab = index => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingBottom: 20, paddingTop: 20}}>
        <Image
          style={{width: 150, height: 150}}
          source={{
            uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
          }}
        />
      </View>
      <Tab
        indicatorStyle={{backgroundColor: '#2C6BED'}}
        variant="default"
        onChange={changeTab}
        value={currentIndex}>
        <Tab.Item title="Login" titleStyle={{color: '#2C6BED'}} />
        <Tab.Item title="Sign up" titleStyle={{color: '#2C6BED'}} />
      </Tab>
      {currentIndex === 0 ? <Login /> : <Register />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
export default UserAuth;
