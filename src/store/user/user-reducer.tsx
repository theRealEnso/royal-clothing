import {AnyAction} from 'redux';
import {signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed} from './user-action';
import {UserData} from '../../utilities/firebase/firebase.utilities';
// import {User} from 'firebase/auth';

export type UserInitialState = {
    readonly currentUser: null | UserData;
    readonly isLoading: boolean;
    readonly error: null | Error
}

const INITIAL_STATE: UserInitialState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(signInSuccess.match(action)){
        return {
            ...state,
            isLoading: false,
            currentUser: action.payload
        };
    };

    if(signInFailed.match(action)){
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
    };

    if(signUpSuccess.match(action)){
        return {
            ...state,
            isLoading: false,
            currentUser: action.payload
        };
    };

    if(signUpFailed.match(action)){
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
    };

    if(signOutSuccess.match(action)){
        return {
            ...state,
            isLoading: false,
            currentUser: null
        };
    };

    if(signOutFailed.match(action)){
        return {
            ...state,
            isLoading: false,
            error: action.payload,
        };
    };
    
    return state;
};
// export const userReducer = (state = INITIAL_STATE, action) => {
//     const {type, payload} = action;

//     switch(type){
//         case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: payload //currentUser: user
//             }
//         case USER_ACTION_TYPES.SIGN_IN_FAILED:
//             return {
//                 ...state,
//                 error: payload
//             }
//         case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: payload
//             }
//         case USER_ACTION_TYPES.SIGN_UP_FAILED:
//             return {
//                 ...state,
//                 error: payload
//             }
//         case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//             return {
//                 ...state,
//                 currentUser: null
//             }
//         case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//             return {
//                 ...state,
//                 error: payload
//             }
//         default:
//             return state;
//     };
// };