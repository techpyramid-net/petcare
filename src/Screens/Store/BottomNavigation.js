import React from 'react';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Components/Dashboard';
import HiringPetDetails from './Components/HiringpetDetail';
import ChatHistoryForStore from './CustomScreens/ChatHistory';
import ChatScreenForStore from './CustomScreens/ChatScreen';
import ChatComponentForStore from './CustomScreens/chat';
import StoreReminders from './Components/Reminders';
import AddReminder from './Components/AddReminders';
import AddReminderParent from './Components/ReminderParent';

/**
 * @author
 * @function StoreBottomNavigation
 **/

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};

const DashboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Hired Pet"
        component={HiringPetDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreChatHistory"
        component={ChatComponentForStore}
        options={{title: 'Lets Chat'}}
      />
      <Stack.Screen
        name="StoreChat"
        component={ChatScreenForStore}
        options={{title: 'Lets Chat'}}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminder}
        options={{title: 'Add Reminders'}}
      />
    </Stack.Navigator>
  );
};

const StoreBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen
        name="storeReminders"
        component={AddReminderParent}
        options={{title: 'Reminders'}}
      />
    </Tab.Navigator>
  );
};

export default StoreBottomNavigation;
