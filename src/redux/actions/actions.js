import {SET_CURRENT_USER, TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE, LoginTypes} from './types'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

// user and login actions 
export const setCurrentUser = user => {
    return {type: SET_CURRENT_USER,  payload: user}
}

export const googleStart = () => ({
    type: LoginTypes.GOOGLE_START
})

export const googleSuccess = user => ({
    type: LoginTypes.GOOGLE_OK,
    payload: user
})

export const googleFailure = e => ({
    type: LoginTypes.GOOGLE_FAILURE,
    payload: e
})

export const emailStart = emailPsw => ({
    type: LoginTypes.EMAIL_START,
    payload: emailPsw
})

export const emailSuccess = user => ({
    type: LoginTypes.EMAIL_OK,
    payload: user
})

export const emailFailure = e => ({
    type: LoginTypes.EMAIL_FAILURE,
    payload: e
})

// shop and cart actions

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

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START,
})

export const fetchCollectionsFailure = errorMsg => ({
    type: FETCH_COLLECTIONS_FAILURE,
    payload: errorMsg
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        // this is done b/c of redux-thunk
        dispatch(fetchCollectionsStart())

        collectionRef.get().then(snapshot => {
          const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
          dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}

export const fetchCollectionsSuccess= collectionsMap => ({
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})