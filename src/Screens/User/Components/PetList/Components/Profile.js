/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {Image, Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import {db, storage} from '../../../../../firebase';
import * as firebase from 'firebase';
import ProfileHeader from './ProfileHeader';

/**
 * @author
 * @function Profile
 **/
const Profile = ({navigation}) => {
  const {container, inputContainer} = styles;
  const userAuthReducer = useSelector(state => state.UserAuthReducer);
  const {currentUser} = userAuthReducer;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageName, setImageName] = useState('');

  const [email, setEmail] = useState(currentUser[0].data.email);
  const [name, setName] = useState(currentUser[0].data.name);
  const [location, setLocation] = useState(currentUser[0].data.location);
  const [phone, setPhone] = useState(currentUser[0].data.phone);
  const [imageUrl, setImageUrl] = useState(
    currentUser[0].data.image ? currentUser[0].data.image : '',
  );

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

  const getUserData = () => {
    db.collection('users')
      .where('email', '==', currentUser[0].data.email)
      .get()
      .then(val => {
        let getUserData = val.docs.map(doc => {
          return {id: doc.id, data: doc.data()};
        });
        dispatch({
          type: 'CURRENT_USER',
          payload: getUserData,
        });
      });
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
        // console.log('cam e');
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
              .set(
                {
                  name: name,
                  email: email,
                  location: location,
                  phone: phone,
                  image: url,
                },
                {merge: true},
              )
              .then(() => {
                getUserData();
              });
          });
        },
      );
    } catch (e) {
      console.log('err=>>>>', e);
      //   handleLoader();
    }
  };

  const updateProfileFunction = () => {
    setLoader(true);
    db.collection('users')
      .doc(currentUser[0].id)
      .set(
        {
          name: name,
          email: email,
          location: location,
          phone: phone,
          image: imageUrl,
        },
        {merge: true},
      )
      .then(() => {
        setLoader(false);
        getUserData();
      })
      .catch(err => {
        setLoader(false);
      });
  };

  return (
    <>
      <ProfileHeader navigation={navigation} />
      <KeyboardAvoidingView style={container}>
        <ScrollView>
          <TouchableOpacity onPress={requestCameraPermission}>
            <Image
              containerStyle={{
                width: 150,
                height: 150,
                backgroundColor: 'white',
                borderRadius: 100,
                marginTop: 15,
              }}
              source={{
                uri: imageUrl
                  ? imageUrl
                  : 'https://icons-for-free.com/iconfiles/png/512/boy+man+person+user+woman+icon-1320085967769585303.png',
              }}
            />
          </TouchableOpacity>

          <View style={inputContainer}>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={n => setName(n)}
            />
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={e => setEmail(e)}
              disabled
            />
            <Input
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={e => setPhone(e)}
            />
            <Input
              placeholder="Location"
              value={location}
              onChangeText={lo => setLocation(lo)}
            />
            <Button
              disabled={loader}
              title={loader ? 'Updating...' : 'Update'}
              containerStyle={{width: 100}}
              raised
              onPress={updateProfileFunction}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
export default Profile;
