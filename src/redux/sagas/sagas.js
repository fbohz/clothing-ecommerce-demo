import { all, takeLatest, call, put } from 'redux-saga/effects'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {loginSuccess, loginFailure} from '../actions/actions'

import {FETCH_COLLECTIONS_START} from '../actions/types'
import {fetchCollectionsSuccess, fetchCollectionsFailure} from '../actions/actions'

import {LoginTypes} from '../actions/types'
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'

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

export function* userSagas() {
    yield all([
        call(onGoogleStart), 
        call(onEmailStart),
        call(onCheckUserSession),
    ])
}


// ROOT SAGA - if you add new saga you want to listen add it below and then on store as it is import will update it.

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas),
    ])
}