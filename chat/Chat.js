import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatListByUserId } from '../redux/Chat/actions';
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



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChatListByUserId('3c0b8970-46d9-11ed-9445-bdea7f855e09'));


  }, []);
  


 


  console.log("COMPLETE RESPONSE DATA IN CHAT.JS: ", chatState.data);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {chatState.data.map((item, index) => {
        return (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('chatsingle')}>
              <ChatListItem
                id={item.chatId}
                name={item.chatName}
                profileUrl={item.users[0].photo}
                lastMessage="Fine!"
                time="12:34 PM"
                unread="1"
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