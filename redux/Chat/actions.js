import axios from "axios";
import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID,
    GET_CONTACTS,
    GET_ALL_MESSAGE_BY_CHAT_ID,
    CREATE_GROUP
} from "./actionTypes";
import io from 'socket.io-client'
var socket, selectedChatCompare;

export const req = () => {
    console.log("yo");
    return { type: REQ_START };
};

export const reqSuccess = (data) => ({
    type: CHATLIST_SUCCESS,
    data,
});

export const reqFailure = (error) => ({
    type: CHATLIST_FAILURE,
    error: error,
});

export const reqContacts = (data) => ({
  type: GET_CONTACTS,
  data
});
export const createGroup = (data) => ({
  type: CREATE_GROUP,
  data
});
export const reqChatListByUserId = (id) => ({
    type: FETCH_CHATLIST_BY__USER_ID,
    id: id,
});


export const getAllChatListByUserId = (id, privateChat, groupChat) => {
    return async (dispatch) => {

        dispatch(req());
        try {
            console.log("chat", privateChat,id,groupChat)
            if (privateChat === true) {
              const response = await axios.get(
                `https://frisles.herokuapp.com/api/chat/list/user/${id}?isPrivateList=${privateChat}`,
              );
              if (response.status) {
                dispatch(reqSuccess(response.data));
                // console.log("today", response.data)
              }
            } 
            else if (groupChat === true) {
              const response = await axios.get(
                `https://frisles.herokuapp.com/api/chat/list/user/${id}?isGroupList=true`,
              );
              if (response) {
                dispatch(reqSuccess(response.data));
                // console.log("week", response.data)
              }
            }
        }catch (err) {
            console.log('REQUEST FAILED');
            console.log(err.response.status);
            dispatch(reqFailure(err.message));
          }
    };
}

export const getContact = (arr) => {
  return async (dispatch) => {
      dispatch(req());
      try {
          console.log("arr at action",arr)
            const response = await axios.post(
              `https://frisles.herokuapp.com/api/user/list/details`,
              {
                contacts: arr
              },
            );
            console.log("response", response.data)
              dispatch(reqContacts(response.data));
              // console.log("today", response.data)
      }catch (err) {
          console.log('REQUEST FAILED');
          console.log(err.response.status);
          dispatch(reqFailure(err.message));
        }
  };
}

export const groupCreate = (chatName, userChat) => {
  return async (dispatch) => {
      dispatch(req());
      try {
          console.log("arr at action",chatName, userChat)
            const response = await axios.post(
              `https://frisles.herokuapp.com/api/chat?userId=3ac1df80-5a6e-11ed-a871-7d8265a60df7`,
              {
                chatName: chatName,
                isGroupChat: true,
                userChat: userChat
              },
            );
            console.log("response", response.data)
              dispatch(createGroup(response.data));
              // console.log("today", response.data)
      }catch (err) {
          console.log('REQUEST FAILED');
          console.log(err.response.status);
          dispatch(reqFailure(err.message));
        }
  };
}
