import {SET_CURRENT_USER, TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_FAILURE, LoginTypes, CLEAR_CART} from './types'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

// user and login actions 
export const setCurrentUser = user => {
    return {type: SET_CURRENT_USER,  payload: user}
}

export const googleStart = () => ({
    type: LoginTypes.GOOGLE_START
})

export const loginSuccess = user => ({
    type: LoginTypes.OK,
    payload: user
})

export const loginFailure = e => ({
    type: LoginTypes.FAILURE,
    payload: e
})

export const clearError = () => ({
  type: LoginTypes.CLEAR_ERROR
})

export const emailStart = emailPsw => ({
    type: LoginTypes.EMAIL_START,
    payload: emailPsw
})

export const checkUserSession = () => ({
    type: LoginTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: LoginTypes.SIGN_OUT_START
  });
  
  export const signOutSuccess = () => ({
    type: LoginTypes.SIGN_OUT_SUCCESS
  });
  
  export const signOutFailure = error => ({
    type: LoginTypes.SIGN_OUT_FAILURE,
    payload: error
  });
  
  export const signUpStart = userCredentials => ({
    type: LoginTypes.SIGN_UP_START,
    payload: userCredentials
  });
  
  export const signUpSuccess = ({ user, additionalData }) => ({
    type: LoginTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
  });
  
  export const signUpFailure = error => ({
    type: LoginTypes.SIGN_UP_FAILURE,
    payload: error
  });
  

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

export const clearCart = () => ({
    type: CLEAR_CART
  });

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