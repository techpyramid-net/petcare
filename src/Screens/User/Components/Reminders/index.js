import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import Reminders from './ReminderAccordion';

/**
 * @author
 * @function UserReminders
 **/
const UserReminders = () => {
  const [reminderList, setReminderList] = React.useState([]);
  const {currentUser} = useSelector(state => state.UserAuthReducer);

  console.log(currentUser[0].data.email);

  useLayoutEffect(() => {
    db.collection('Reminder')
      .where('email', '==', currentUser[0].data.email)
      .onSnapshot(snapshot =>
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

export default UserReminders;
