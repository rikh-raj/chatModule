import {ScrollView, StyleSheet, Text, TextInput,Image,TouchableOpacity, Alert,View, Dimensions} from 'react-native';
import React,{useState, useEffect} from 'react';
import ChatInnerItem from '../components/Chat/ChatInnerItem';
import ChatHeader from '../components/Chat/ChatHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
var socket, selectedChatCompare;

const data = [
  {
    senderMessage: 'I am good. how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
];
const GroupChat = ({navigation, route}) => {
  const { group, authId } = route.params
  const chatState = useSelector((state)=> state.chatState)
  const dispatch = useDispatch()
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
let user =  {
  "userId": "6dddae20-5925-11ed-a555-c9afc10124e6",
  "firstName": "Danish",
  "lastName": "ali",
  "photo": "https://lh3.googleusercontent.com/a/ALm5wu2hz5IZkrOwKQLw8A8TaCp6rCl4IVi1XKTC8VzemA=s288-p-rw-no",
  "countryCode": "91",
  "phoneNumber": "7439240134",
  "createdAt": "2022-10-31T14:08:01.029Z",
  "updatedAt": "2022-11-03T05:37:14.544Z"
}
var endPoint = `https://frisles.herokuapp.com`


const getMessagesByChatId = async () => {
  // if (!selectedChat) return;

  try {

    setLoading(true);
    const response = await axios.get(
      endPoint +
      `/api/message/chat/${group.chatId}?userId=${authId}`,
    );
    console.log("res", response.data)
    setMessages(response.data);
    setLoading(false);

    socket.emit("join chat", group.chatId);
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
}, []);

useEffect(() => {
  getMessagesByChatId()
}, [group.chatId])
// console.log("first",messages)
  return (
    <View style={styles.container}>
        <ChatHeader

          name={group.chatName}
          profilePic={{uri:group.groupPhoto}}
          number={group.users.map((i)=>i.phoneNumber + ",")}
          navigation={navigation}
          onPressName={()=>navigation.navigate('groupDetails',{chatId: group.chatId})}
        />
      <ScrollView>
        {messages.map(item => {
          return (
            <ChatInnerItem
            navigation={navigation}
            // receiverUsername={item?.data?.firstName +'\b'+ item?.data?.lastName}
            // receiverMessage={item?.data?.content}
            isSender={item?.isSender}
            pic={{uri: item?.data?.photo}}
            username={item?.data?.firstName +'\b'+ item?.data?.lastName}
            message={item?.data?.content}
            time={moment(item?.data?.createdAt).format("hh:mm a")}
          />
          );
        })}
      </ScrollView>
      <View style={{backgroundColor: 'white',width: windowWidth/1, height: 60}}>
        <View style={styles.inputView}>
          <TextInput style={styles.input} 
          placeholderTextColor="#000"
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
            <TouchableOpacity style={styles.emoticon} onPress={() =>console.log("object")}>
            <Feather name='send' size={22} color='#5d6afe' 
            // style={styles.emoticon} onPress={()=> sendMessage()}
            />
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

export default GroupChat;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    color: '#000',
    borderRadius: 20,
    width: windowWidth/1.6,
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
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
    borderColor: '#5d6afe',
    backgroundColor: '#EDF0FE',
    // padding: 10,
    position: 'absolute',
  },
  emoticon: {
    // backgroundColor: 'black',
    // borderColor: 'blue',
    // borderWidth: 1,
      marginLeft: '1%',
      marginTop: '3%',
      width: 26,
      height: 26,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderRadius: 100 / 2,
    },
});
