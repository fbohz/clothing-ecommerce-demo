import {LoginTypes} from './actions/types'

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LoginTypes.OK:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case LoginTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };
        case LoginTypes.SIGN_OUT_FAILURE:
        case LoginTypes.SIGN_UP_FAILURE:    
        case LoginTypes.FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case LoginTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}