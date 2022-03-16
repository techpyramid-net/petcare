import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {auth, db} from '../../../firebase';
import StoreListC from '../../../Components/StoreList';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-native-elements';
import {useDispatch} from 'react-redux';

/**
 * @author
 * @function AdminDashboard
 **/
const AdminDashboard = ({navigation}) => {
  const [allStore, setAllStores] = React.useState([]);
  const dispatch = useDispatch();
  const getPetRealTime = () => {
    db.collection('storeUsers').onSnapshot(function (querySnapshot) {
      var storesList = [];
      querySnapshot.forEach(function (doc) {
        storesList.push({docId: doc.id, ...doc.data()});
      });
      setAllStores(storesList);
    });
  };

  useEffect(() => {
    getPetRealTime();
  }, []);

  const logoutAction = async () => {
    await auth.signOut().then(user => {
      dispatch({type: 'ADMIN_LOGOUT'});
    });
  };

  return (
    <>
      <Header
        backgroundColor="#2C6BED"
        leftComponent={{text: 'Pet Detail', style: {color: '#fff'}}}
        rightComponent={() => (
          <TouchableOpacity>
            <TouchableOpacity onPress={logoutAction}>
              <Icon name="logout" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          All Stores
        </Text>
        {allStore.map((item, index) => {
          return (
            <StoreListC
              key={index}
              data={item}
              navigation={navigation}
              getPetRealTime={getPetRealTime}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

export default AdminDashboard;
