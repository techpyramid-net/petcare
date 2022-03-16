import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import StoreDetailHeader from './StoreDetailsHeader';
import {Button} from 'react-native-elements';
import {db} from '../../../../../firebase';
import {useSelector} from 'react-redux';

/**
 * @author
 * @function StoreDetails
 **/
const StoreDetails = ({route, navigation}) => {
  const {storeData} = route.params;
  const {age, foodDes, foodname, image, name, status, docId} =
    route.params.petDetails;
  const [isApplied, setIsApplied] = useState(false);
  const {currentUser} = useSelector(state => state.UserAuthReducer);

  const HireMeFunction = () => {
    db.collection('storeUsers')
      .doc(route.params.storeData.id)
      .collection('HiringPets')
      .add({
        id: docId,
        userId: currentUser[0].id,
      })
      .then(() => {
        setIsApplied(true);
        db.collection('users')
          .doc(currentUser[0].id)
          .collection('petList')
          .doc(docId)
          .update({
            status: 'Pending',
          });
      });
  };

  return (
    <View>
      <StoreDetailHeader
        navigation={navigation}
        currentUserEmail={currentUser[0].data.email}
        storeUserEmail={storeData.email}
      />
      <Image
        style={{height: 250}}
        source={{
          uri: 'https://thumbs.dreamstime.com/b/various-pet-care-products-display-display-wilkinson-store-situated-bedford-united-kingdom-there-30266398.jpg',
        }}
      />
      <View style={styles.contentContainer}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text>Name:</Text>
          <Text style={styles.storename}>{storeData.storename}</Text>
          <Text>Per Hour:</Text>
          <Text>${storeData.perHourRate}</Text>
          <Text>Email:</Text>
          <Text>{storeData.email}</Text>
          <Text>Phone:</Text>
          <Text>{storeData.phone}</Text>
          <Text style={{paddingTop: 10}}>Address:</Text>
          <Text style={{paddingBottom: 20}}>{storeData.address}</Text>
          {route.params.petDetails && (
            <Button
              onPress={HireMeFunction}
              disabled={
                status === 'Pending' || status === 'Confirm' || isApplied
              }
              title="Hire me"
              raised
              buttonStyle={{width: 100}}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {},
  storename: {
    fontSize: 25,
  },
});
export default StoreDetails;
