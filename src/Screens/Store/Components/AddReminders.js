import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button, Input} from 'react-native-elements';
import moment from 'moment';
import { db } from '../../../firebase';

/**
 * @author
 * @function AddReminders
 **/
const AddReminders = ({navigation, route}) => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingdate, setMeetingdate] = useState('');

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTimeConfirm = time => {
    setMeetingTime(moment(time).format('LT'));
    hideTimePicker();
  };

  const showDatePicker = () => {
    setisDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setisDatePickerVisible(false);
  };
  const handleDateConfirm = time => {
    setMeetingdate(moment(time).format('MMM/DD/YYYY'));
    hideDatePicker();
  };

  const AddReminderFun = () => {
    if (
      meetingName === '' ||
      meetingLink === '' ||
      meetingTime === '' ||
      meetingdate === ''
    ) {
      alert('all fields required!');
    } else {
      db.collection('Reminder').add({
        meetingName: meetingName,
        meetingLink: meetingLink,
        meetingTime: meetingTime,
        meetingdate: meetingdate,
        email: route.params,
        status: 'Pending',
      });
    }
  };

  return (
    <View>
      <Input
        placeholder="Meeting Name"
        autoFocus
        value={meetingName}
        onChangeText={val => setMeetingName(val)}
      />
      <Input
        placeholder="Meeting Link"
        value={meetingLink}
        onChangeText={val => setMeetingLink(val)}
      />
      <View style={{alignItems: 'center'}}>
        <Button
          onPress={showTimePicker}
          buttonStyle={{width: 150, marginBottom: 10}}
          title={
            meetingTime === ''
              ? 'Select New Time'
              : JSON.parse(JSON.stringify(meetingTime))
          }
        />

        <Button
          onPress={showDatePicker}
          buttonStyle={{width: 150}}
          title={
            meetingdate === ''
              ? 'Select New Time'
              : JSON.parse(JSON.stringify(meetingdate))
          }
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={{alignItems: 'center', paddingTop: 10}}>
        <View style={{paddingBottom: 10}}>
          <Button
            title="Send Reminder"
            buttonStyle={{width: 200}}
            onPress={AddReminderFun}
          />
        </View>
      </View>
    </View>
  );
};

export default AddReminders;
