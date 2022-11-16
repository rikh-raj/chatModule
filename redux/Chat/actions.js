import axios from "axios";
import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID,
    GET_ALL_MESSAGE_BY_CHAT_ID
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



export const reqChatListByUserId = (id) => ({
    type: FETCH_CHATLIST_BY__USER_ID,
    id: id,
});

// export const MessageByChatId =(data)=>({
//     type: GET_ALL_MESSAGE_BY_CHAT_ID,
//     data
// })


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
        // axios
        //     .get(`https://frisles.herokuapp.com//api/chat/list/user/${id}?isPrivateList=true`)
        //     .then((response) => {
        //         console.log("COMPLETE RESPONSE DATA: ", response.data);
        //         if (response.status) {
        //             dispatch(reqSuccess(response.data));
        //         } else {
        //             dispatch(reqFailure("Error getting Chat list by user id"));
        //             console.log(
        //                 "Something's not right! Please try again after some time."
        //             );
        //         }
        //     })
        //     .catch((err) => {
        //         dispatch(reqFailure(err.message));
        //     });
    };
}

// export const getAllMessageByChatId = (id, chatId) => {
//     return async (dispatch) => {

//         dispatch(req());
//         try {
//             console.log("chat",id, chatId)
//               const response = await axios.get(
//                 `https://frisles.herokuapp.com/api/message/chat/${chatId}?userId=${id}`,
//               );
//               if (response.status) {
//                 dispatch(MessageByChatId(response.data));
//                 socket.emit("join chat", chatId);
//                 console.log("message", response.data)
//               }
//         }catch (err) {
//             console.log('REQUEST FAILED');
//             console.log("errro",err.response.status);
//             dispatch(reqFailure(err.message));
//           }
//     };
// }
