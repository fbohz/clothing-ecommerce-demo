import {LoginTypes} from './actions/types'

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LoginTypes.EMAIL_OK:
        case LoginTypes.GOOGLE_OK:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case LoginTypes.EMAIL_FAILURE:
        case LoginTypes.GOOGLE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}