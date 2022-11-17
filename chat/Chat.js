import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useCallback} from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getAllChatListByUserId } from '../redux/Chat/actions';
import moment from 'moment'
import { getAllMessageByChatId } from '../redux/Message/actions';

const data = [
  {
    name: "Rajarshi",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "This is Okay!",
    time: "12:34 PM",
    unread: 3,
    isOnline: true,
  },
  {
    name: "Krishna",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "Fine!",
    time: "12:34 PM",
    unread: 15,
    isOnline: false,
  }
]
export default function Chat({ navigation }) {

  const chatState = useSelector((state) => state.chatState);
const [privateChat,setPrivatechat]=useState(true)
const [refresh, setRefresh]=useState(false)

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllChatListByUserId('6dddae20-5925-11ed-a555-c9afc10124e6'));


  // }, []);
const authId= "3ac1df80-5a6e-11ed-a871-7d8265a60df7"
  useFocusEffect(
    useCallback(()=>{
      if(navigation.isFocused()){
  //         console.log("single chat")
  //       // alert("today is true",today)
  //       // console.log("before hook today", today)
  //       // setRefresh(true)
  //       // setTimeout(() => dispatch(getAllChatListByUserId(authId,privateChat, null)), 5000)
  //       // replace with your function
  //       setRefresh(false)
  dispatch(getAllChatListByUserId(authId,privateChat, null))
      }
    },[dispatch,navigation.isFocused()])
    )
  // console.log("COMPLETE RESPONSE DATA IN CHAT.JS: ", chatState.data);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('allContacts')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {chatState.data.map((item, index) => {
        return (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('chatsingle',{chat: item, authId})}>
              <ChatListItem 
                // id={item.chatId}
                name={item.chatName}
                profileUrl={item.users[0].photo}
                lastMessage={item.lastMessage}
                time={moment(item.lastMessageTime).format("hh:mm a")}
                unread={item.unreadMessages}
                isOnline={false}
              />
            </TouchableOpacity>
          </View>
        )
      })}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  button: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 45,
    color: 'white',


  },
  plus: {
    fontSize: 45,
    color: 'white',
    alignSelf: 'center',

  }
})