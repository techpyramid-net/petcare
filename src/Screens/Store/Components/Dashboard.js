import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import PetListForStore from '../../../Components/PetListForStore';
import {db} from '../../../firebase';
import DashboardHeadere from './DashboardHeader';

/**
 * @author
 * @function Dashboard
 **/
const Dashboard = ({navigation}) => {
  const {currentStoreUser} = useSelector(state => state.StoreAuthReducer);
  const [petList, setPetList] = useState([]);

  const getPetRealTime = () => {
    db.collection('storeUsers')
      .doc(currentStoreUser[0].id)
      .collection('HiringPets')
      .onSnapshot(function (querySnapshot) {
        var IdsList = [];
        querySnapshot.forEach(function (doc) {
          IdsList.push({docId: doc.id, ...doc.data()});
        });
        // var getPetList = [];
        IdsList.forEach(item => {
          db.collection('users')
            .doc(item.userId)
            .collection('petList')
            .get()
            .then(val => {
              let arr = [];
              val.docs.map(doc => {
                if (doc.id === item.id) {
                  arr.push({id: doc.id, ...doc.data(), userId: item.userId});
                }
              });
             setPetList(arr);
            });
        });
        // console.log('here is the final list=====>', petList);
      });
  };

  useEffect(() => {
    getPetRealTime();
  }, [currentStoreUser]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <DashboardHeadere />
        {petList.map((item, index) => {
          return (
            <PetListForStore
              key={index}
              data={item}
              navigation={navigation}
              getPetRealTime={getPetRealTime}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
