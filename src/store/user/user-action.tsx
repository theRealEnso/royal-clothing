// setting up helper functions that we ultimately need to dispatch

import { USER_ACTION_TYPES } from "./user-types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utilities/reducer-utilities";
import { UserData, AdditionalInformation } from "../../utilities/firebase/firebase.utilities";
import {User} from 'firebase/auth';

//define type objects

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, User>;

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>;

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: User, additionalInformation: AdditionalInformation}>;

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;

// /////////////     sagas are set up to listen to these actions being dispatched       ///////////////////////////////////////////////////////////////////////

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}));

export const signInSuccess = withMatcher((userAuth: User): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, userAuth));

export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName}));

export const signUpSuccess = withMatcher((user: User, additionalInformation: AdditionalInformation): SignUpSuccess => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalInformation}));

export const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));


// note to self

//end goal is to write dispatch(setCurrentUser(user)), which ultimately does:
// dispatch({
//     type: USER_ACTION_TYPES.SET_CURRENT_USER,
//     payload: user
// });

// const createAction = (type, payload) => ({type, payload});
// =>
// const createAction = (type, payload) => {
//     return {
//         type: USER_ACTION_TYPES.SET_CURRENT_USER,
//         payload: user
//     }
// }

// try {
//     //  const response = await createAuthUserWithEmailAndPassword(email, password);
//     //  console.log(response);
//     const {user} = await createAuthUserWithEmailAndPassword(email, password); //destructure user directly from response i.e. response.user
//     await createUserDocumentOrSignInUserFromAuth(user, {displayName});
//     setFormInputs({
//         displayName: '',
//         email: '',
//         password:'',
//         confirmPassword: ''
//     });

// } catch (error) {
//     error.code === 'auth/email-already-in-use' ? alert(`Cannot create user, email already in use!`) : console.log(`Error with creating user`, error);
// };

