import { all, takeLatest, call, put } from 'redux-saga/effects'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import {FETCH_COLLECTIONS_START} from '../actions/types'
import {fetchCollectionsSuccess, fetchCollectionsFailure, clearCart} from '../actions/actions'

import {LoginTypes} from '../actions/types'
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'

import {
    loginSuccess, 
    loginFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from '../actions/actions'

// SHOP SAGAS

export function* fetchCollectionsAsync() {
    const collectionRef = firestore.collection('collections');

    try {
        //no longer using promise oriented but now generator function.
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)

        //put is like using dispatch
        yield put(fetchCollectionsSuccess(collectionsMap))

    } catch (e) {
        yield put(fetchCollectionsFailure(e.message))

    }
}

export function* fetchCollectionsStart() {
    // pause when this action happens. takeLatest best option.
    yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
  }


// USER SAGAS

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapshot = yield userRef.get()

        yield put(
            loginSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch(e) {
        yield put(loginFailure(e))
    }
}

export function* loginGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapShotFromUserAuth(user)
    } catch(e) {
        yield put(loginFailure(e))
    }
}

export function* onGoogleStart() {
    yield takeLatest(LoginTypes.GOOGLE_START, loginGoogle)
}

export function* loginEmail({payload: {email,psw}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, psw)
        yield getSnapShotFromUserAuth(user)

    } catch(e){
        yield put(loginFailure(e))
    }

}

export function* onEmailStart() {
    yield takeLatest(LoginTypes.EMAIL_START, loginEmail)
}

export function* isUserAuthenticated() {
    try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return;
      yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
      yield put(loginFailure(error));
    }
  }

export function* onCheckUserSession() {
    yield takeLatest(LoginTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
      yield auth.signOut();
      yield put(signOutSuccess());
    } catch (error) {
      yield put(signOutFailure(error));
    }
  }
  
  export function* signUp({ payload: { email, password, displayName } }) {
    try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
      yield put(signUpFailure(error));
    }
  }
  
  export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapShotFromUserAuth(user, additionalData);
  }
  
  export function* onGoogleSignInStart() {
    yield takeLatest(LoginTypes.GOOGLE_SIGN_IN_START, loginGoogle);
  }
  
  export function* onEmailSignInStart() {
    yield takeLatest(LoginTypes.EMAIL_SIGN_IN_START, loginEmail);
  }
  
  export function* onSignOutStart() {
    yield takeLatest(LoginTypes.SIGN_OUT_START, signOut);
  }
  
  export function* onSignUpStart() {
    yield takeLatest(LoginTypes.SIGN_UP_START, signUp);
  }
  
  export function* onSignUpSuccess() {
    yield takeLatest(LoginTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
  }
  

export function* userSagas() {
    yield all([
        call(onGoogleStart), 
        call(onEmailStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}

// CART Sagas

export function* clearCartOnSignOut() {
    yield put(clearCart());
  }
  
  export function* onSignOutSuccess() {
    yield takeLatest(LoginTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
  }
  
  export function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
  }


// ROOT SAGA - if you add new saga you want to listen add it below and then on store as it is import will update it.

export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
    ])
}