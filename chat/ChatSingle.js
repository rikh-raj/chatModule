import { ScrollView, StyleSheet, Text, View, Image,TextInput,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import ChatInnerItem from '../components/Chat/ChatInnerItem'
import ChatHeader from '../components/Chat/ChatHeader';
import ImagePicker from 'react-native-image-crop-picker';

const data = [
  {
    senderMessage: 'how are you all good?'
  },
  {
    senderMessage: 'how are you all good?'
  },
  {
    senderMessage: 'how are you all good?'
  },
  {
    senderMessage: 'how are you all good?'
  },
]

const ChatSingle = ({navigation}) => {
  const launchCameraPhoto = () => {
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });

}
  return (
    <View style={styles.container}>
        <ChatHeader
          name="Rajashri"
          number="+91986754321"
          navigation={navigation}
        />
      <ScrollView>
      <ChatInnerItem 
      name="Rajarshi"
      number='+91986754321'
      navigation = {navigation}
      receiverUsername='User name'
      receiverMessage='Hey, there Whats Up , Hope you are doing good in your life'
      senderUsername='User name'
      senderMessage='All Good, What about You?'
      />
      </ScrollView>
      <View style={{backgroundColor: 'white',width: windowWidth/1, height: 60}}>
      <View style={styles.inputView}>
          <TextInput style={styles.input} 
          placeholderTextColor='#000'
          placeholder='Type here'
          />
          <TouchableOpacity style={styles.emoticon}>
          <Image
          source={require('../assets/icons/png/smile.png')}
          style={{height: 25, width: 25, marginTop: '19%',marginLeft: '7%',}}
          />
          </TouchableOpacity>
          <TouchableOpacity style={styles.emoticon} onPress={()=>launchCameraPhoto()}>
          <Image
          source={require('../assets/icons/png/cameraColor.png')}
          style={{height: 27, width: 27, marginTop: '19%',marginLeft: '7%',}}
          />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ChatSingle

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
      height: 45,
      // margin: 12,
      borderRadius: 20,
      width: windowWidth/1.6,
      marginLeft: '3%',
      marginBottom: '3%',
      marginTop: '3%',
      color: '#000',
      // backgroundColor: 'red',
      alignSelf: 'center'
    },
    inputView: {
      flexDirection:'row',
      height: 50,
      // marginTop: '12%',
      alignSelf: 'center',
      width: windowWidth/1.2,
      borderWidth: 1,
      // top: 0,
      bottom: 10,
      // marginLeft: '10%',
      // marginBottom: '10%',
      // marginRight: '10%',
      borderRadius: 10,
      borderColor: 'blue',
      backgroundColor: '#EDF0FE',
      // padding: 10,
      position: 'absolute',
    },
    emoticon: {
      // backgroundColor: 'black',
      // borderColor: 'blue',
      // borderWidth: 1,
      marginLeft: '2%',
      marginTop: '3%',
      width: 27,
      height: 27,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderRadius: 100 / 2,
    },
})