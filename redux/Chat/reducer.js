import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID,
    GET_CONTACTS,
    CREATE_GROUP,
    GET_ALL_GROUPDETAILS_BY_CHAT_ID
} from "./actionTypes";

//Initial state///

const initialState = {
    loading: false,
    data: [],
    contacts: [],
    group: []
};


// REDUCER FUNCTION.
const chatReducer = (state = initialState, action) => {
    console.log("fired");
    switch (action.type) {
        case REQ_START: {
            console.log("Getting Chat List Data");
            return { ...state, loading: true, error: "" };
        }

        case CHATLIST_SUCCESS: {
            console.log("Successfully Got List");
            console.log(action.data);
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case FETCH_CHATLIST_BY__USER_ID: {
            console.log("Successfully Got Chat List by User id");
            return {
                ...state,
                data: action.data,
                error: "",
                loading: false,
            };
        }
        case GET_CONTACTS: {
            // console.log("got contacts", action.data)
            return{
                ...state,
                contacts: action.data,
                error: '',
                loading: false
            }
        }
        case CREATE_GROUP: {
            // console.log("group create", action.data)
            return{
                ...state,
                group: action.data,
                error: '',
                loading: false
            }
        }
        case GET_ALL_GROUPDETAILS_BY_CHAT_ID: {
            // console.log("group details", action.data)
            return{
                ...state,
                data: action.data,
                error: '',
                loading: false
            }
        }
        case CHATLIST_FAILURE: {
            return {
                ...state,
                data: [],
                error: action.error,
                loading: false,
            };
        }
        default:
            return state;
    }
};

export default chatReducer;