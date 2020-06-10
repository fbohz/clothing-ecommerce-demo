import { takeEvery, call, put } from 'redux-saga/effects'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

import {FETCH_COLLECTIONS_START} from '../actions/types'
import {fetchCollectionsSuccess, fetchCollectionsFailure} from '../actions/actions'

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
    // pause when this action happens
    yield takeEvery(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}


//