import React, {useEffect, useState} from 'react';
import NearStorMap from './Components/NearStoresMap';
import GetLocation from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {PermissionsAndroid} from 'react-native';
import {useSelector} from 'react-redux';

/**
 * @author
 * @function PetHistory
 **/
const PetHistory = ({navigation, route}) => {
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const {hiredPet} = useSelector(state => state.CustomReducer);

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

  useEffect(() => {
    getPermission();
  }, [navigation]);

  return (
    <NearStorMap
      route={{params: {latitude, longitude}}}
      navigation={navigation}
      hiredPet={hiredPet}
    />
  );
};

export default PetHistory;
