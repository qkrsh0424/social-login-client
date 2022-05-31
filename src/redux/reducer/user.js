import { combineReducers } from "redux";

const user = (state ={ userInfo: null }, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return{
                ...state,
                userInfo: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    user: user
});
