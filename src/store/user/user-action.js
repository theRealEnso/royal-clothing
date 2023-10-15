// setting up helper functions that we ultimately need to dispatch

import { USER_ACTION_TYPES } from "./user-types";
import { createAction } from "../../utilities/reducer-utilities";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

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

// sagas are set up to listen to these actions being dispatched
export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (userAuth) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, userAuth);

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName});

export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalDetails});

export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

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

