import {StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid,
  Platform,} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import ChatListItem from '../components/Chat/ChatListItem';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllChatListByUserId} from '../redux/Chat/actions';
import {getContact} from '../redux/Chat/actions';
import Contacts from 'react-native-contacts';
import moment from 'moment';

export default function Group({navigation}) {
  const chatState = useSelector(state => state.chatState);
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groupChat, setGroupchat] = useState(true);
  const dispatch = useDispatch();
  const authId = '3ac1df80-5a6e-11ed-a871-7d8265a60df7';
  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        console.log('group chat');
        // alert("today is true",today)
        // console.log("before hook today", today)
        dispatch(
          getAllChatListByUserId(
            '3ac1df80-5a6e-11ed-a871-7d8265a60df7',
            null,
            groupChat,
          ),
        ); // replace with your function
      }
    }, [dispatch, navigation.isFocused()]),
  );
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setData(contacts);
        setContacts(contacts.map(i => i.phoneNumbers.map(p => p.number)));
      })
      .catch(e => {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      });
  };
  let arr = [];
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let value = (element[0] || '').replace(/\D/g, '').slice(-10);
    arr.push(value);
  }
  // console.log("arr", chatState.contacts, arr)
   const contact = async() => {
    await dispatch(getContact(arr));
    navigation.navigate('groupCreation')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>contact()}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {chatState.data.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('groupChat', {group: item, authId})
            }>
            <ChatListItem
              id={index}
              name={item.chatName}
              profileUrl={item.groupPhoto}
              lastMessage={item.lastMessage}
              time={moment(item.lastMessageTime).format('hh:mm a')}
              unread={item.unreadMessages}
              isOnline={item.isOnline}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: '#5d6aff',
    width: 60,
    height: 60,
    borderRadius: 45,
    color: 'white',
  },
  plus: {
    fontSize: 45,
    color: 'white',
    alignSelf: 'center',
  },
});
