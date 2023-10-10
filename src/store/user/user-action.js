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


export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

