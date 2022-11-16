import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
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
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('groupCreation')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {data.map((item, index) => {
        return (
          <TouchableOpacity onPress={()=>navigation.navigate('groupChat')}>
            <ChatListItem
            id={index}
              name={item.name}
              profileUrl={item.profileUrl}
              lastMessage={item.lastMessage}
              time={item.time}
              unread={item.unread} 
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