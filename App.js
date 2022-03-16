import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/Navigation';
import store from './src/redux';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Navigation />
    </Provider>
  );
};

export default App;
