import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import {db} from '../../../firebase';
import Reminders from './Reminders';

/**
 * @author
 * @function ReminderParent
 **/
const ReminderParent = () => {
  const [reminderList, setReminderList] = React.useState([]);

  useLayoutEffect(() => {
    db.collection('Reminder').onSnapshot(snapshot =>
      setReminderList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    );
  }, []);

  return (
    <View>
      <Reminders reminderList={reminderList} />
    </View>
  );
};

export default ReminderParent;
