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
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatInnerItem = props => {
  const navigation = props.navigation;
  // console.log(props.isSender,"ddd")
  return (
    // <View style={{
    //   justifyContent: 'center',
    //   backgroundColor: 'pink'
    // }}>
    <>
      {props.isSender ?
        <>
          <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.messageRight} key={props.key2}>
                <Text style={styles.senderUsername}>{props.username}</Text>
                <Text style={styles.senderMessage}>{props.message}</Text>
              </View>
              <View>
                <Text style={{ alignSelf: 'flex-end', marginRight: '5%' }}>{props.time}</Text>
              </View>
            </View>
            <View style={styles.messageImageRight}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2 }}
                source={props.pic} />
            </View>
          </View>
        </>
        :
        <>
          <View style={{ flexDirection: 'row', margin: '2%' }}>
            <View style={styles.messageImage}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2 }}
                source={props.pic} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.message} key={props.key1}>
                <Text style={styles.receiverUsername}>{props.username}</Text>
                <Text style={styles.receiverMessage}>{props.message}</Text>
              </View>
              <View>
                <Text style={{ alignSelf: 'flex-end', marginRight: '5%' }}>{props.time}</Text>
              </View>

            </View>
          </View>
        </>
      }
    </>
    // {/* </View> */}
  );
};

export default ChatInnerItem;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  messageImage: {
    // backgroundColor: 'black',
    marginLeft: '2%',
    marginTop: '12%',
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
    width: windowWidth / 1.4,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  messageImageRight: {
    // backgroundColor: 'grey',
    marginLeft: '2%',
    marginTop: '12%',
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  messageRight: {
    backgroundColor: 'black',
    marginLeft: '10%',
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
