/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapStyle from './mapCustomStyle';
import {markers} from './markersConfig';
import {db} from '../../../../../firebase';

/**
 * @author
 * @function NearStoreMap
 **/

var maxDistance = 20;

const NearStoreMap = ({route, navigation, hiredPet}) => {
  // console.log('===>', route);
  const [nearMarkers, setNearMarkers] = useState([]);

  const checkStoreDetail = data => {
    navigation.navigate('Store Details', {
      storeData: data,
      petDetails: hiredPet,
    });
  };

  function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  useEffect(() => {
    db.collection('storeUsers')
      .get()
      .then(snapShot => {
        let storeUser = [];
        snapShot.docs.map(doc => {
          storeUser.push({id: doc.id, ...doc.data()});
        });
        if (storeUser.length) {
          let getNearByStores = storeUser?.filter(item => {
            let getTotalDistance = getDistance(
              route.params.latitude,
              route.params.longitude,
              item.location.latitude,
              item.location.longitude,
            );

            if (getTotalDistance.toPrecision(4) <= maxDistance) {
              return item;
            }
          });
          setNearMarkers(getNearByStores);
        }
      });
  }, [route]);

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{width: '100%', height: '100%'}}
        customMapStyle={MapStyle}
        region={{
          latitude: 29.953766364126796,
          longitude: 70.13026367400649,
          latitudeDelta: 100,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        followsUserLocation={true}>
        {nearMarkers?.map((i, index) => {
          return (
            <Marker
              key={index}
              coordinate={i.location}
              onPress={() => checkStoreDetail(i)}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default NearStoreMap;
