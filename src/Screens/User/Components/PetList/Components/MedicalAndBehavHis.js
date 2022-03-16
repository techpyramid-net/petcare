import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tab} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * @author
 * @function MedicalAndBehavHistory
 **/
const MedicalAndBehavHistory = ({route}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(route.params);
  const changeTab = index => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Tab
        indicatorStyle={{backgroundColor: '#2C6BED'}}
        variant="default"
        onChange={changeTab}
        value={currentIndex}>
        <Tab.Item title="Medical History" titleStyle={{color: '#2C6BED'}} />
        <Tab.Item title="Behavior History" titleStyle={{color: '#2C6BED'}} />
      </Tab>
      {route.params.historyDetail.medicalHeading ? (
        <View style={{marginLeft: 'auto', marginRight: 'auto', width: '90%'}}>
          <ScrollView>
            {currentIndex === 0 ? (
              <View style={{paddingTop: 10, paddingBottom: 100}}>
                <Text style={{fontSize: 20}}>Title:</Text>
                <Text style={{paddingLeft: 20}}>
                  {route.params.historyDetail.medicalHeading}
                </Text>
                <Text style={{fontSize: 20}}>Description:</Text>
                <Text style={{paddingLeft: 20}}>
                  {route.params.historyDetail.medicalHistory}
                </Text>
              </View>
            ) : (
              <View style={{paddingTop: 10, paddingBottom: 100}}>
                <Text style={{fontSize: 20}}>Title:</Text>
                <Text style={{paddingLeft: 20}}>
                  {route.params.historyDetail.behaviorHeading}
                </Text>
                <Text style={{fontSize: 20}}>Description:</Text>
                <Text style={{paddingLeft: 20}}>
                  {route.params.historyDetail.behaviorHistory}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <Text style={{textAlign: 'center', paddingTop: 20}}>
          Not Added yet by the store or you didn't hired yet!
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
export default MedicalAndBehavHistory;
