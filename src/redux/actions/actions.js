import {SET_CURRENT_USER, TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, UPDATE_COLLECTIONS} from './types'

export const setCurrentUser = user => {
    return {type: SET_CURRENT_USER,  payload: user}
}

// this is the same as above but since () no return explicit needed.
export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
    type: ADD_ITEM,
    payload: item
})

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item,
})

export const updateCollections = collectionsMap => ({
    type: UPDATE_COLLECTIONS,
    payload: collectionsMap
})