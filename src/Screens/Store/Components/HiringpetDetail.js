import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {db, storage} from '../../../firebase';
import AddPet from './AddIntoPet';
import PetDetailHeader from './PetDetailHeader';

/**
 * @author
 * @function HiringPetDetails
 **/
const HiringPetDetails = ({navigation, route}) => {
  const {petImage, updateButton, storename} = styles;
  const {name, age, image, foodname, foodDes, id, userId} =
    route.params.data;
  const {currentStoreUser} = useSelector(state => state.StoreAuthReducer);

  console.log(route.params);

  const [petName, setpetName] = useState(name);
  const [petAge, setpetAge] = useState(age);
  const [foodName, setFoodName] = useState(foodname);
  const [foodDesc, setfoodDesc] = useState(foodDes);
  const [imageUrl, setImageUrl] = useState(image);
  const [petOwnerDetail, setPetOwnerDetails] = useState({});

  useLayoutEffect(() => {
    let docRef = db.collection('users').doc(userId);
    docRef.get().then(function (doc) {
      setPetOwnerDetails(doc.data());
    });
  }, [route]);

  const confirmStatus = () => {
      db.collection('users').doc(userId).collection('petList').doc(id).update({
        status: 'Confirm',
      }).then(()=>{
        route.params.fun();
          alert('status changed to done!');
      })
  }

  const AddData = (medH,behvH,medD,behvD) => {
    db.collection('users')
      .doc(userId)
      .collection('petList')
      .doc(id)
      .update({
        medicalHeading: medH,
        behaviorHeading: behvH,
        medicalHistory: medD,
        behaviorHistory: behvD,
      })
      .then(() => {
        alert('Added!');
      });
  }

  return (
    <>
      <PetDetailHeader
        navigation={navigation}
        currentUserEmail={currentStoreUser[0].data.email}
        UserEmail={petOwnerDetail.email}
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <Image
            style={petImage}
            source={{
              uri: imageUrl,
            }}
          />
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={{textAlign: 'center', paddingTop: 10}}>
              Pet Detail
            </Text>
            <View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Pet Name:</Text>
                <Text style={styles.storename}>{petName}</Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Pet Age:</Text>
                <Text>{petAge}</Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Food:</Text>
                <Text>{foodName}</Text>
              </View>
              <Text style={styles.heading}>Food Description:</Text>
              <Text style={{paddingBottom: 10}}>
                {foodDesc} fsd fsdf sdf sdf sdf sd fsd fsdf sdf sdf sdf sdfsd
                fsdf sdf sdf sdf sdfsd fsdf sdf sdf sdf sdfsd fsdf sdf sdf sdf
                sdfsd fsdf sdf sdf sdf sd
              </Text>
            </View>
            <Text style={{textAlign: 'center', paddingTop: 10}}>
              Owner Detail
            </Text>

            <View style={{paddingBottom: 10}}>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Name:</Text>
                <Text style={styles.storename}>{petOwnerDetail.name}</Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Email:</Text>
                <Text style={styles.storename}>{petOwnerDetail.email}</Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Location:</Text>
                <Text style={styles.storename}>{petOwnerDetail.location}</Text>
              </View>
              <View style={styles.flexBox}>
                <Text style={styles.heading}>Phone:</Text>
                <Text style={styles.storename}>{petOwnerDetail.phone}</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Button
                title="Confirm"
                buttonStyle={{width: 140}}
                onPress={confirmStatus}
              />
              <Text style={{paddingTop: 5}}>
                Click on Confirm once you recieved the pet!
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={{position: 'absolute', bottom: 5, right: 30}}>
        <AddPet AddData={AddData} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  petImage: {
    width: '100%',
    height: 200,
  },
  updateButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storename: {
    fontSize: 15,
  },
  heading: {
    fontWeight: 'bold',
  },
});
export default HiringPetDetails;
