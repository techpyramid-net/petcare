import React, {useState} from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import PetDetailHeader from './PetDetailHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {db, storage} from '../../../../../firebase';
import * as firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';

/**
 * @author
 * @function PetDetail
 **/
const PetDetail = ({navigation, route}) => {
  const {petImage, picEditButton, deleteButton, updateButton} = styles;
  const {
    name,
    age,
    image,
    foodname,
    foodDes,
    docId,
    medicalHeading,
    behaviorHeading,
    medicalHistory,
    behaviorHistory,
  } = route.params.data;
  const userAuthReducer = useSelector(state => state.UserAuthReducer);
  const {currentUser} = userAuthReducer;
  const dispatch = useDispatch();

  // console.log(medicalHeading);

  const [petimage, setImage] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageName, setImageName] = useState('');
  const [petName, setpetName] = useState(name);
  const [petAge, setpetAge] = useState(age);
  const [foodName, setFoodName] = useState(foodname);
  const [foodDesc, setfoodDesc] = useState(foodDes);
  const [imageUrl, setImageUrl] = useState(image);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setImageName(response.fileName);
        setImageType(response.type);
        setImage(response.uri);
        ProfileImageHandler(response.uri);
      },
    );
  };

  const ProfileImageHandler = async uri => {
    // console.log('came here');
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      let ref = storage.ref().child(new Date().toISOString());
      let snapshot = ref.put(blob);
      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          // handleLoader();
        },
        err => {
          console.log('err', err);
          // handleLoader();
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(url => {
            blob.close();
            setImageUrl(url);

            db.collection('users')
              .doc(currentUser[0].id)
              .collection('petList')
              .doc(docId)
              .set(
                {
                  name: petName,
                  age: petAge,
                  foodname: foodName,
                  foodDes: foodDesc,
                  image: url,
                },
                {merge: true},
              )
              .then(() => {
                route.params.fun();
              });
          });
        },
      );
    } catch (e) {
      console.log('err=>>>>', e);
      //   handleLoader();
    }
  };

  const updatePet = () => {
    db.collection('users')
      .doc(currentUser[0].id)
      .collection('petList')
      .doc(docId)
      .set(
        {
          name: petName,
          age: petAge,
          foodname: foodName,
          foodDes: foodDesc,
          image: imageUrl,
        },
        {merge: true},
      )
      .then(() => {
        route.params.fun();
      });
  };

  const deletePet = () => {
    db.collection('users')
      .doc(currentUser[0].id)
      .collection('petList')
      .doc(docId)
      .delete()
      .then(() => {
        route.params.goBack;
      })
      .then(() => {
        route.params.goBack.navigate('Pet List');
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <PetDetailHeader
          historyDetail={{
            medicalHeading: medicalHeading,
            behaviorHeading: behaviorHeading,
            medicalHistory: medicalHistory,
            behaviorHistory: behaviorHistory,
          }}
          navigation={navigation}
        />
        <View style={picEditButton}>
          <Button
            onPress={requestCameraPermission}
            icon={<Icon name="edit" color="white" size={20} />}
            buttonStyle={{
              width: 40,
              borderRadius: 50,
              height: 40,
              backgroundColor: 'transparent',
            }}
          />
        </View>
        <Image
          style={petImage}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={{paddingTop: 30}}>
          <Input
            placeholder="Name"
            value={petName}
            onChangeText={val => setpetName(val)}
          />
          <Input
            placeholder="Age"
            value={petAge}
            onChangeText={val => setpetAge(val)}
          />
          <Input
            placeholder="Food Name"
            value={foodName}
            onChangeText={val => setFoodName(val)}
          />
          <Input
            placeholder="Food Desc"
            value={foodDesc}
            onChangeText={val => setfoodDesc(val)}
            multiline
          />
          <Button
            onPress={updatePet}
            title="Update"
            buttonStyle={updateButton}
            value={petName}
            onChangeText={val => setpetName(val)}
          />
          <Button
            onPress={deletePet}
            title="Delete"
            buttonStyle={deleteButton}
            value={petName}
            onChangeText={val => setpetName(val)}
          />
          <Button
            onPress={() => {
              dispatch({
                type: 'HIRED_PETS',
                payload: route.params.data,
              });
              route.params.goBack.navigate('Pet History');
            }}
            title="Hire Us"
            buttonStyle={updateButton}
            value={petName}
            onChangeText={val => setpetName(val)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  petImage: {
    width: '100%',
    height: 200,
  },
  picEditButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 10,
  },
  updateButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#CA0B00',
  },
});
export default PetDetail;
