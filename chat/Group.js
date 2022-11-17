import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useCallback} from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getAllChatListByUserId } from '../redux/Chat/actions';
import moment from 'moment';

const data = [
  {
    name: "Rajarshi",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "This is Okay!",
    time: "12:34 PM",
    unread: 3,
    isOnline:false
  },
  {
    name: "Krishna",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "Fine!",
    time: "12:34 PM",
    unread: 15,
    isOnline:true
  }
]
export default function Group({navigation}) {
  const chatState = useSelector((state) => state.chatState);
  const [groupChat,setGroupchat]=useState(true)
  const dispatch = useDispatch()
const authId= "3ac1df80-5a6e-11ed-a871-7d8265a60df7"
  useFocusEffect(
    useCallback(()=>{
      if(navigation.isFocused()){
          console.log("group chat")
        // alert("today is true",today)
        // console.log("before hook today", today)
        dispatch(getAllChatListByUserId('3ac1df80-5a6e-11ed-a871-7d8265a60df7',null, groupChat)) // replace with your function
      }
    },[dispatch,navigation.isFocused()])
  )
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('groupCreation')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {chatState.data.map((item, index) => {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('groupChat',{group: item, authId})}>
            <ChatListItem 
            id={index}
              name={item.chatName}
              profileUrl={item.groupPhoto}
              lastMessage={item.lastMessage}
              time={moment(item.lastMessageTime).format("hh:mm a")}
              unread={item.unreadMessages} 
              isOnline = {item.isOnline}/>
         </TouchableOpacity>
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
  button:{
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: 'black',
        width: 60,
        height: 60,
        borderRadius: 45,
        color:'white',
        
        
  },
  plus:{
    fontSize:45,
    color:'white',
    alignSelf:'center',

  }
})