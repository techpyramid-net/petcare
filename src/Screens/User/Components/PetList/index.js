import React, {useEffect, useLayoutEffect, useState} from 'react';
import UserHeader from '../UserHeader';
import UserPetList from '../../../../Components/PetList';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AddPet from './Components/AddPet';
import {db} from '../../../../firebase';
import {useSelector} from 'react-redux';

/**
 * @author
 * @function PetList
 **/
const PetList = ({navigation}) => {
  const userAuthReducer = useSelector(state => state.UserAuthReducer);
  const {currentUser} = userAuthReducer;
  const [petList, setPetList] = useState([]);

  const getPetRealTime = () => {
    db.collection('users')
      .doc(currentUser[0].id)
      .collection('petList')
      .onSnapshot(function (querySnapshot) {
        var petList = [];
        querySnapshot.forEach(function (doc) {
          petList.push({docId: doc.id, ...doc.data()});
        });
        setPetList(petList);
      });
  };

  useEffect(() => {
    getPetRealTime();
  }, [currentUser]);

  return (
    <View style={{flex: 1}}>
      <UserHeader title="Home" navigation={navigation} />
      <ScrollView>
        {petList.map((item, index) => {
          return (
            <UserPetList
              key={index}
              data={item}
              navigation={navigation}
              getPetRealTime={getPetRealTime}
            />
          );
        })}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 30, right: 30}}>
        <AddPet />
      </View>
    </View>
  );
};

export default PetList;
