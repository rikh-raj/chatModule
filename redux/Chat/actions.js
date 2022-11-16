import axios from "axios";
import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID
} from "./actionTypes";

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


export const getAllChatListByUserId = (id) => {
    return async (dispatch) => {

        dispatch(req());
        axios
            .get(`http://10.0.2.2:8000/api/chat/list/user/${id}`)
            .then((response) => {
                console.log("COMPLETE RESPONSE DATA: ", response.data);
                if (response.status) {
                    dispatch(reqSuccess(response.data));
                } else {
                    dispatch(reqFailure("Error getting Chat list by user id"));
                    console.log(
                        "Something's not right! Please try again after some time."
                    );
                }
            })
            .catch((err) => {
                dispatch(reqFailure(err.message));
            });
    };
};
