import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PetList from './Components/PetList';
import PetHistory from './Components/History';
// import HireUs from './Components/HireUs';
import Reminders from './Components/Reminders';
import {createStackNavigator} from '@react-navigation/stack';
import PetDetail from './Components/PetList/Components/PetDetail';
import MedicalAndBehavHistory from './Components/PetList/Components/MedicalAndBehavHis';
import Profile from './Components/PetList/Components/Profile';
import StoreDetails from './Components/History/Components/StoreDetails';
// import ChatHistory from '../CustomScreens/ChatHistory';
import ChatComponent from '../CustomScreens/chat';
import ChatScreen from '../CustomScreens/ChatScreen';

/**
 * @author
 * @function UserBottomNavigation
 **/

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};

const PetDetailFun = () => {
  return (
    <Stack.Navigator
      initialRouteName="Pet List"
      screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Pet List"
        component={PetList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pet Detail"
        component={PetDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={MedicalAndBehavHistory}
        options={{title: 'Medical And Behavior History'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const PetHistoryFun = () => {
  return (
    <Stack.Navigator
      initialRouteName="Pet History"
      screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Pet History"
        component={PetHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Store Details"
        component={StoreDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat History"
        component={ChatComponent}
        options={{title: 'Lets Chat'}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{title: 'Lets Chat'}}
      />
    </Stack.Navigator>
  );
};

const UserBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pet List" component={PetDetailFun} />
      <Tab.Screen name="Pet History" component={PetHistoryFun} />
      <Tab.Screen name="Reminders" component={Reminders} />
      {/* <Tab.Screen name="Hire Us" component={HireUs} /> */}
    </Tab.Navigator>
  );
};

export default UserBottomNavigation;
