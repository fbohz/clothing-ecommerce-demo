import { all, takeLatest, call, put } from 'redux-saga/effects'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {googleSuccess, googleFailure, emailSuccess, emailFailure} from '../actions/actions'

import {FETCH_COLLECTIONS_START} from '../actions/types'
import {fetchCollectionsSuccess, fetchCollectionsFailure} from '../actions/actions'

import {LoginTypes} from '../actions/types'
import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils'

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

export function* loginGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        const userRef = yield call(createUserProfileDocument, user)
        const userSnapshot = yield userRef.get()

        yield put(
            googleSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch(e) {
        yield put(googleFailure(e))
    }
}

export function* onGoogleStart() {
    yield takeLatest(LoginTypes.GOOGLE_START, loginGoogle)
}

export function* loginEmail({payload: {email,psw}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, psw)
        const userRef = yield call(createUserProfileDocument, user)
        const userSnapshot = yield userRef.get()

        yield put(
            emailSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch(e){
        yield put(emailFailure(e))
    }

}

export function* onEmailStart() {
    yield takeLatest(LoginTypes.EMAIL_START, )
}

export function* userSagas() {
    yield all([call(onGoogleStart), call(onEmailStart)])
}


// ROOT SAGA - if you add new saga you want to listen add it below and then on store as it is import will update it.

export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas),
    ])
}