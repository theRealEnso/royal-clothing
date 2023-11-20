// import {takeLatest, all, call, put} from 'redux-saga/effects';
import {takeLatest, all, call, put} from 'typed-redux-saga/macro'; //the /macro allows us to use the babel plugin

import {USER_ACTION_TYPES} from './user-types';

import {signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed, EmailSignInStart, SignUpStart, SignUpSuccess} from './user-action';

import { getCurrentUser, createUserDocumentOrSignInUserFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutAuthUser, AdditionalInformation } from '../../utilities/firebase/firebase.utilities';

import {User} from 'firebase/auth';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentOrSignInUserFromAuth, userAuth, additionalDetails); // Use call for normal function calls. Use put to replace with dispatch. syntax a bit different => separate inputs using commas instead of wrapping them inside parens
        // console.log(userSnapshot);
        // console.log(userSnapshot.data());

        if(userSnapshot){
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()})); // intersect UserData type with another Type object that has id set as a string data type
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* signInWithGoogle(){
    try {
        const {user} = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user) //additionalDetails param not used here, so w need to make this field optional by adding a ? to this param inside the original function definition
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password); // syntax a bit different => separate inputs using commas instead of wrapping them inside parens
        if(userCredential){
            const {user} = userCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
    try {
        const createdUser = yield* call(createAuthUserWithEmailAndPassword, email, password);
        
        if(createdUser){
            const {user} = createdUser;
            yield* put(signUpSuccess(user, {displayName}));
        }
    } catch(error) {
        yield* put(signUpFailed(error as Error));
    };
};

export function* signInAfterSignUp({payload: {user, additionalInformation}}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);
};

export function* signOutUser() {
    try {
        yield* call(signOutAuthUser);
        yield* put(signOutSuccess());
    } catch(error) {
        yield* put(signOutFailed(error as Error));
    };
};

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onGoogleSignInStart(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignInStart () {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUser);
};

export function* userSaga() {
    yield* all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
};
