import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AdminDashboard from './Components/Dashboard';

/**
 * @author
 * @function AdminBottomNavigation
 **/

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};

const AdminDashboardFun = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="Dashboard"
        component={AdminDashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AdminBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={AdminDashboardFun} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
