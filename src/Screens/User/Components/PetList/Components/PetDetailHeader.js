import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

/**
 * @author
 * @function PetDetailHeader
 **/

const PetDetailHeader = ({historyDetail, navigation}) => {
  // console.log("===>",historyDetail);
  return (
    <Header
      backgroundColor="#2C6BED"
      leftComponent={() => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
      )}
      centerComponent={{text: 'Pet Detail', style: {color: '#fff'}}}
      rightComponent={() => (
        <TouchableOpacity
          onPress={() => navigation.navigate('History', {historyDetail})}>
          <IonIcons name="eye" size={20} color="white" />
        </TouchableOpacity>
      )}
    />
  );
};

export default PetDetailHeader;
