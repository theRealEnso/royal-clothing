import {takeLatest, all, call, put} from 'redux-saga/effects';

import {USER_ACTION_TYPES} from './user-types';

import {signInSuccess, signInFailed} from './user-action';

import { getCurrentUser, createUserDocumentOrSignInUserFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utilities/firebase/firebase.utilities';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentOrSignInUserFromAuth, userAuth, additionalDetails); // syntax a bit different => separate inputs using commas instead of wrapping them inside parens
        console.log(userSnapshot);
        console.log(userSnapshot.data());
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* signInWithGoogle(){
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password); // syntax a bit different => separate inputs using commas instead of wrapping them inside parens
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignInStart () {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* userSaga() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(signInWithEmail)]);
};