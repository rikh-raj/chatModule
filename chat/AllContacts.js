import { StyleSheet, Text, View, FlatList } from 'react-native'
import React,{useState, useEffect}from 'react'
import Contacts from 'react-native-contacts';
import ContactList from '../components/Chat/ContactList';

const AllContacts = ({contact}) => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      Contacts.getAll().then(contacts => {
        setContacts(contacts);
      });
    }, []);
    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
      };
      const renderItem = ({item, index}) => {
        return <ContactList contact={console.log("contacts", item)} />;
      };
  return (
    <View style={styles.container}>
     <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
    />
    </View>
  )
    // return(
//     <View style={styles.contactCon}>
//     <View style={styles.imgCon}>
//       <View style={styles.placeholder}>
//         <Text style={styles.txt}>{contact?.givenName[0]}</Text>
//       </View>
//     </View>
//     <View style={styles.contactDat}>
//       <Text style={styles.name}>
//         {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
//         {contact?.familyName}
//       </Text>
//       <Text style={styles.phoneNumber}>
//         {contact?.phoneNumbers[0]?.number}
//       </Text>
//     </View>
//   </View>
// )
};
const styles = StyleSheet.create({
contactCon: {
  flex: 1,
  flexDirection: 'row',
  padding: 5,
  borderBottomWidth: 0.5,
  borderBottomColor: '#d9d9d9',
},
imgCon: {},
placeholder: {
  width: 55,
  height: 55,
  borderRadius: 30,
  overflow: 'hidden',
  backgroundColor: '#d9d9d9',
  alignItems: 'center',
  justifyContent: 'center',
},
contactDat: {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 5,
},
txt: {
  fontSize: 18,
},
name: {
  fontSize: 16,
},
phoneNumber: {
  color: '#888',
},
});

export default AllContacts
