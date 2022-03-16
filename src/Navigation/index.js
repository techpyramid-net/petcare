import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStartScreen from '../Screens/AuthStartScreen';
import UserAuth from '../Screens/AuthScreens/UserAuth';
import StoreAuth from '../Screens/AuthScreens/StoreAuth';
import AdminAuth from '../Screens/AuthScreens/AdminAuth';
import UserBottomNavigation from '../Screens/User/BottomNavigation';
import {useSelector} from 'react-redux';
import StoreBottomNavigation from '../Screens/Store/BottomNavigation';
import AdminBottomNavigation from '../Screens/Admin/BottomNavigation';

/**
 * @author
 * @function Navigation
 **/

const Stack = createStackNavigator();

const UserAuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Authstart">
      <Stack.Screen
        name="UserAuth"
        component={UserAuth}
        options={{title: 'User Auth'}}
      />

      <Stack.Screen
        name="Authstart"
        component={AuthStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreAuth"
        component={StoreAuth}
        options={{title: 'Store Auth'}}
      />
      <Stack.Screen
        name="AdminAuth"
        component={AdminAuth}
        options={{title: 'Admin Auth'}}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const reducer = useSelector(state => state);

  const {isUserAuthenticated, loaderForUser} = reducer.UserAuthReducer;
  const {isStoreUserAuthenticated, loaderForStore} = reducer.StoreAuthReducer;
  const {isAdminAuthenticated, loaderForAdmin} = reducer.AdminAuthReducer;

  const globalScreenOptions = {
    headerStyle: {backgroundColor: '#2C6BED'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Authstart"
        screenOptions={globalScreenOptions}>
        {!isUserAuthenticated &&
        !isStoreUserAuthenticated &&
        !isAdminAuthenticated ? (
          <Stack.Screen
            name="Authstart"
            options={{headerShown: false}}
            component={UserAuthStack}
          />
        ) : isUserAuthenticated ? (
          <Stack.Screen
            name="UserPanel"
            component={UserBottomNavigation}
            options={{headerShown: false}}
          />
        ) : isStoreUserAuthenticated ? (
          <Stack.Screen
            name="StorePanel"
            component={StoreBottomNavigation}
            options={{headerShown: false}}
          />
        ) : (
          isAdminAuthenticated && (
            <Stack.Screen
              name="AdminPanel"
              component={AdminBottomNavigation}
              options={{headerShown: false}}
            />
          )
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
