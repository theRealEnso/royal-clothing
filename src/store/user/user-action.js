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


