import {
    REQ_START,
    CHATLIST_SUCCESS,
    CHATLIST_FAILURE,
    FETCH_CHATLIST_BY__USER_ID
} from "./actionTypes";

//Initial state///

const initialState = {
    loading: false,
    data: [],
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