import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Contacts from 'react-native-contacts';
import AllContacts from '../../chat/AllContacts';


const ContactList = ({contact}) => {
    // const [contacts, setContacts] = useState([]);
    // useEffect(() => {
    //   Contacts.getAll().then(contacts => {
    //     setContacts(contacts);
    //   });
    // }, []);
    // const keyExtractor = (item, idx) => {
    //     return item?.recordID?.toString() || idx.toString();
    //   };
    //   const renderItem = ({item, index}) => {
    //     return <AllContacts contact={console.log("contacts", item)} />;
    //   };
//   return (
       return(
    <View style={styles.contactCon}>
    <View style={styles.imgCon}>
      <View style={styles.placeholder}>
        <Text style={styles.txt}>{contact?.givenName[0]}</Text>
      </View>
    </View>
    <View style={styles.contactDat}>
      <Text style={styles.name}>
        {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
        {contact?.familyName}
      </Text>
      <Text style={styles.phoneNumber}>
        {contact?.phoneNumbers[0]?.number}
      </Text>
    </View>
  </View>
)
//   )
}

export default ContactList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1
    }
})