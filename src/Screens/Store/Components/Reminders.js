import React, {Component} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {View, Text} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import {db} from '../../../firebase';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

class StoreReminder extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return <View>{/* <Text>{section.content}</Text> */}</View>;
  };

  _renderHeader = section => {
    console.log(section);
    return (
      <View>
        <ListItem bottomDivider>
          <Avatar
            source={{
              uri: 'https://cdn.iconscout.com/icon/free/png-256/reminder-1605670-1361019.png',
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{section.data.meetingName}</ListItem.Title>
            <ListItem.Subtitle>Status: {section.data.status}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  _updateStatus = id => {
    db.collection('Reminder').doc(id).update({
      status: 'Done',
    });
  };

  _renderContent = section => {
    return (
      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting Name:</Text>
          <Text>{section.data.meetingName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting With:</Text>
          <Text>{section.data.email}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting Link:</Text>
          <Text>{section.data.meetingLink}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting Time:</Text>
          <Text>{section.data.meetingTime}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting Date:</Text>
          <Text>{section.data.meetingdate}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Meeting Status:</Text>
          <Text>{section.data.status}</Text>
        </View>
        <Button
          disabled={section.data.status === 'Done'}
          title="Click if Done"
          onPress={() => this._updateStatus(section.id)}
        />
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    // console.log('=========>', this.props.reminderList);
    return (
      <>
        <Header
          backgroundColor="#2C6BED"
          leftComponent={{text: 'Pet Detail', style: {color: '#fff'}}}
        />
        <ScrollView>
          <Accordion
            sections={this.props.reminderList}
            activeSections={this.state.activeSections}
            //   renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
      </>
    );
  }
}

export default StoreReminder;
