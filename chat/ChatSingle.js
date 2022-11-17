import { ScrollView, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import ChatInnerItem from '../components/Chat/ChatInnerItem'
import ChatHeader from '../components/Chat/ChatHeader';
import ImagePicker from 'react-native-image-crop-picker';
// import { getAllMessageByChatId } from '../redux/Chat/actions'
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import moment from 'moment';
import { err } from 'react-native-svg/lib/typescript/xml';
var socket, selectedChatCompare;


const ChatSingle = ({ navigation, route }) => {
  const { chat, authId } = route.params
  const dispatch = useDispatch()
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
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
  let user = {
    "userId": "3ac1df80-5a6e-11ed-a871-7d8265a60df7",
    "firstName": "Andalib",
    "lastName": "Quraishi",
    "photo": 'https://assets.vogue.in/photos/622f9af651da11b2e5b0b176/master/pass/7%20times%20Alia%20Bhatt%20served%20sublime%20beauty%20moments%20.jpg',
    "countryCode": "91",
    "phoneNumber": "987654321",
    "createdAt": "2022-11-02T05:21:39.705Z",
    "updatedAt": "2022-11-02T05:21:39.705Z"
  }
  var endPoint = `https://frisles.herokuapp.com`


  const getMessagesByChatId = async () => {
    // if (!selectedChat) return;

    try {

      setLoading(true);
      const response = await axios.get(
        endPoint +
        `/api/message/chat/${chat.chatId}?userId=${authId}`,
      );
      console.log("yo yo", response.data)
      setMessages(response.data);
      setLoading(false);

      socket.emit("join chat", chat.chatId);
    } catch (error) {
      console.log("err", error.message)
      Alert.alert("error")
    }
  };
  useEffect(() => {
    socket = io(endPoint);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // getAllMessageByChatId()
    // eslint-disable-next-line
  }, [socket]);
  useEffect(() => {
    getMessagesByChatId()
    selectedChatCompare = chat
  }, [chat.chatId])

  useEffect(() => {
    console.log("new msg",selectedChatCompare)
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        // !selectedChatCompare || // if chat is not selected or doesn't match current chat
        // selectedChatCompare.chatId !== newMessageRecieved.chatId
        newMessageRecieved
      ) 
      {
        
        // setMessages([...messages,newMessageRecieved]);
        messages.push(newMessageRecieved)
      }
      console.log("new msg inside ", newMessageRecieved)
    });
  },[messages,socket]);
  // console.log("time", moment().toISOString())
// console.log("old msg", messages)
  const typingHandler = (event) => {
    setNewMessage(event);
    console.log(event)
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chat.chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat.chatId);
        setTyping(false);
      }
    }, timerLength);
  };
  const sendMessage = async (event) => {
    // console.log("event",event.nativeEvent)
    if (newMessage) {
      socket.emit("stop typing", chat.chatId);
      try {
        setNewMessage("");
        await axios.post(
          endPoint +
          `/api/message/chat/${chat.chatId}/user/${authId}`,
          {
            content: newMessage,
            createdAt: moment().toISOString(),
            firstName: user.firstName,
            lastName: user.lastName,
            photo: user.photo
          },
        ).then(async(response) => {
          if(response.status==200){
            // console.log("re", messages)
            // console.log(response.data)
            await socket.emit("new message", response.data);

            await messages.push(response.data)
            
          }
        })
        
        
        // setMessages([...messages, response.data]);
      } catch (error) {
        console.log("error at send message", error.response.status)
        Alert.alert("error of send message")
      }
    }
  };
  // console.log(chat, authId)
  return (
    <View style={styles.container}>
      <ChatHeader
        profilePic={{ uri: chat.users[0].photo }}
        name={chat.chatName}
        number={chat.users[0].phoneNumber}
        navigation={navigation}
      />
      <ScrollView ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {messages.map((item, index) => {
          return (
            <>
              <ChatInnerItem
              send={item?.data?.userId}
                navigation={navigation}
                isSender={item?.isSender}
                pic={{ uri: item?.data?.photo }}
                username={item?.data?.firstName + '\b' + item?.data?.lastName}
                message={item?.data?.content}
                time={moment(item?.data?.createdAt).format("hh:mm a")}
              />
            </>
          )
        })}
      </ScrollView>
      {istyping ?
        <View>
          <Text>typing...</Text>
        </View>
        :
        null
      }
      <View style={{ backgroundColor: 'white', width: windowWidth / 1, height: 60 }}>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholderTextColor='#000'
            placeholder='Type here'
            value={newMessage}
            onChangeText={(e) => typingHandler(e)}
            // onKeyPress={sendMessage}
          />
          <TouchableOpacity style={styles.emoticon}>
            <Image
              source={require('../assets/icons/png/smile.png')}
              style={{ height: 25, width: 25, marginTop: '19%', marginLeft: '7%', }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.emoticon} onPress={() => launchCameraPhoto()}>
            <Image
              source={require('../assets/icons/png/cameraColor.png')}
              style={{ height: 27, width: 27, marginTop: '19%', marginLeft: '7%', }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.emoticon} onPress={() => sendMessage()}>
            <Text>Send</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    // margin: 12,
    borderRadius: 20,
    width: windowWidth / 1.6,
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
    color: '#000',
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
    // marginTop: '12%',
    alignSelf: 'center',
    width: windowWidth / 1.1,
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