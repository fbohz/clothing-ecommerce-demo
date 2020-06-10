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
        case LoginTypes.FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}