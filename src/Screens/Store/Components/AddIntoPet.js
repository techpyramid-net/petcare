/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * @author
 * @function AddPet
 **/

const AddPet = ({AddData}) => {
  const [visible, setVisible] = useState(false);
  const [medicalHeading, setMedicalHeading] = useState('');
  const [behaviorHeading, setbehaviorHeading] = useState('');
  const [medicalDesc, setMedicalDesc] = useState('');
  const [BehaviorDesc, setBehaviorDesc] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
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
        <Text style={{textAlign: 'center'}}>
          Add Pet Medical And Behavior History
        </Text>
        <Input
          onChangeText={val => setMedicalHeading(val)}
          placeholder="Heading About Medical Report"
          value={medicalHeading}
        />
        <Input
          placeholder="Heading About Behavior Report"
          value={behaviorHeading}
          onChangeText={val => setbehaviorHeading(val)}
        />
        <Input
          placeholder="Medical Report Description"
          multiline
          numberOfLines={5}
          value={medicalDesc}
          style={{textAlignVertical: 'top'}}
          onChangeText={val => setMedicalDesc(val)}
        />
        <Input
          placeholder="Behavior Report Description"
          multiline
          numberOfLines={5}
          value={BehaviorDesc}
          style={{textAlignVertical: 'top'}}
          onChangeText={val => setBehaviorDesc(val)}
        />
        <View>
          <Button
            onPress={() =>
              AddData(
                medicalHeading,
                behaviorHeading,
                medicalDesc,
                BehaviorDesc,
              )
            }
            buttonStyle={{
              width: '50%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            title="Submit"
          />
        </View>
      </Overlay>
    </>
  );
};

export default AddPet;
