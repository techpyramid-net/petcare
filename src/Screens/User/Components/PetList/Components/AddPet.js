/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, PermissionsAndroid, View} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import {db, storage} from '../../../../../firebase';
import * as firebase from 'firebase';
import {useSelector, useDispatch} from 'react-redux';

/**
 * @author
 * @function AddPet
 **/

const AddPet = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [foodname, setFoodname] = useState('');
  const [foodDes, setFoodDesc] = useState('');
  const [image, setImage] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setisImageLoading] = useState(false);
  const userAuthReducer = useSelector(state => state.UserAuthReducer);
  const {currentUser} = userAuthReducer;

  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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

  const ProfileImageHandler = async uri => {
    // console.log('came here');
    setisImageLoading(true);
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
          setisImageLoading(false);

          console.log('err', err);
          // handleLoader();
          blob.close();
          return;
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then(url => {
            blob.close();
            setisImageLoading(false);
            setImageUrl(url);
          });
        },
      );
    } catch (e) {
      setisImageLoading(false);

      console.log('err=>>>>', e);
      //   handleLoader();
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

  const UploadPetDetail = () => {
    if (
      name === '' ||
      age === '' ||
      foodname === '' ||
      foodDes === '' ||
      image === ''
    ) {
      alert('all fields are required!');
    } else {
      db.collection('users').doc(currentUser[0].id).collection('petList').add({
        name: name,
        age: age,
        foodname: foodname,
        foodDes: foodDes,
        image: imageUrl,
        status: 'Not Applied',
        medicalHeading: '',
        behaviorHeading: '',
        medicalHistory: '',
        behaviorHistory: '',
      });
    }
  };

  return (
    <>
      <Button
        onPress={toggleOverlay}
        buttonStyle={{width: 50, borderRadius: 50, height: 50}}
        icon={<Icon name="add" size={25} color="white" />}
      />
      <Overlay
        overlayStyle={{width: '90%'}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Text style={{textAlign: 'center'}}>Add Pet Details</Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={val => setName(val)}
        />
        <Input
          placeholder="Age"
          value={age}
          onChangeText={val => setAge(val)}
        />

        <Input
          placeholder="Food Name"
          value={foodname}
          onChangeText={val => setFoodname(val)}
        />
        <Input
          placeholder="Description"
          multiline
          numberOfLines={5}
          value={foodDes}
          onChangeText={val => setFoodDesc(val)}
          style={{textAlignVertical: 'top'}}
        />
        <View>
          <Button
            disabled={isImageLoading}
            buttonStyle={{
              width: '50%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            title={isImageLoading ? 'uploading...' : 'Upload Image'}
            onPress={requestCameraPermission}
          />
        </View>
        <Button
          title="Submit"
          raised
          buttonStyle={{marginTop: 20}}
          onPress={UploadPetDetail}
        />
      </Overlay>
    </>
  );
};

export default AddPet;
