import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatInnerItem = props => {
  const navigation = props.navigation;
  return (
    <View >
      {props.receiverMessage?
      <View style={{flexDirection: 'row'}}>
        <View style={styles.messageImage}></View>
        <View style={styles.message} key={props.key1}>
          <Text style={styles.receiverUsername}>{props.receiverUsername}</Text>
          <Text style={styles.receiverMessage}>{props.receiverMessage}</Text>
        </View>
      </View>:null
      }
      {props.senderMessage? 
      <View style={{flexDirection: 'row'}}>
        <View style={styles.messageRight} key={props.key2}>
          <Text style={styles.senderUsername}>{props.senderUsername}</Text>
          <Text style={styles.senderMessage}>{props.senderMessage}</Text>
        </View>
        <View style={styles.messageImageRight}></View>
      </View>
      :null
    }
    </View>
  );
};

export default ChatInnerItem;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  messageImage: {
    backgroundColor: 'black',
    marginLeft: '5%',
    marginTop: '20%',
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  message: {
    backgroundColor: '#cacaca',
    marginLeft: '2%',
    marginTop: '3%',
    padding: 5,
    // height: windowHeight / 9,
    height: 'auto',
    width: windowWidth / 1.5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  messageImageRight: {
    backgroundColor: 'grey',
    marginLeft: '2%',
    marginTop: '17%',
    width: 30,
    height: 30,
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  messageRight: {
    backgroundColor: 'black',
    marginLeft: '15%',
    marginTop: '5%',
    height: 'auto',
    // height: windowHeight / 9,
    width: windowWidth / 1.5,
    borderTopEndRadius: 10,
    padding: 5,
    // borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  receiverUsername: {
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    marginTop: '2%',
    marginLeft: '5%',
    // margin: '5%'
  },
  receiverMessage: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: '#000',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
  senderUsername: {
    textAlign: 'left',
    fontSize: 14,
    color: '#fff',
    marginTop: '2%',
    marginLeft: '5%',
    // margin: '5%'
  },
  senderMessage: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: '#fff',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
});
