import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 * @author
 * @function HireUs
 **/
const HireUs = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <Text>HireUs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HireUs;
