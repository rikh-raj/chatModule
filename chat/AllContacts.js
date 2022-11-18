import { StyleSheet, Text, View, FlatList, PermissionsAndroid, Platform, TextInput } from 'react-native'
import React,{useState, useEffect}from 'react'
import Contacts from 'react-native-contacts';
import ContactList from '../components/Chat/ContactList';

const AllContacts = ({contact}) => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          }).then(() => {
            loadContacts();
          }
        );
      } else {
        loadContacts();
      }
    }, []);
    const loadContacts = () => {
      Contacts.getAll()
        .then(contacts => {
          contacts.sort(
            (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setContacts(contacts);
        })
        .catch(e => {
          alert('Permission to access contacts was denied');
          console.warn('Permission to access contacts was denied');
        });
    };
    const search = (text) => {
      const phoneNumberRegex = 
        /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
      if (text === '' || text === null) {
        loadContacts();
      } else if (phoneNumberRegex.test(text)) {
        Contacts.getContactsByPhoneNumber(text).then(contacts => {
          contacts.sort(
            (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setContacts(contacts);
          console.log('contacts', contacts);
        });
      } else {
        Contacts.getContactsMatchingString(text).then(contacts => {
          contacts.sort(
            (a, b) => 
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setContacts(contacts);
          console.log('contacts', contacts);
        });
      }
    };
    const openContact = (contact) => {
      console.log(JSON.stringify(contact));
      Contacts.openExistingContact(contact);
    };
  return (
    <View style={styles.container}>
      <TextInput
          onChangeText={search}
          placeholderTextColor='#000'
          se
          placeholder="Search"
          style={styles.searchBar}
        />
     <FlatList
          data={contacts}
          renderItem={(contact) => {
            return (
              <ContactList
                key={contact.item.recordID}
                item={contact.item}
                onPress={openContact}
              />
            );
          }}
          keyExtractor={(item) => item.recordID}
        />
    </View>
  )
};
const styles = StyleSheet.create({
container: {
  flex:1,
  backgroundColor: '#fff'
},
searchBar: {
  backgroundColor: '#f0eded',
  paddingHorizontal: 30,
  color: '#000',
  paddingVertical: Platform.OS === 'android' ? undefined : 15,
},
});

export default AllContacts
