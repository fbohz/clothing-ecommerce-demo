import {SET_CURRENT_USER, TOGGLE_CART_HIDDEN} from './types'

export const setCurrentUser = user => {
    return {type: SET_CURRENT_USER,  payload: user}
}

// this is the same as above but since () no return explicit needed.
export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN
})