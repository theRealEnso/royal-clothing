import {Category} from "./category-types";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category-actions";
import {AnyAction} from 'redux';


// need to specify data types of CATEGORIES_INITIAL_STATE. 
// Define type named CategoriesState and the correct identify correct data types =>
// attach this to CATEGORIES_INITIAL_STATE. Pass to initial state value in the reducer, so that state ends up inheriting CategoriesState (state = CATEGORIES_INITIAL_STATE = CategoriesState)
export type CategoriesState = {
    readonly categoriesArray: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null,
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categoriesArray: [],
    isLoading: false,
    error: null,
};

export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    //use Object.assign to take the action creator, and modify it so that it has the extracted type as well as the match method
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
        // match method / function receives whatever action flows through reducers (which has shape of AnyAction), but checks if the type properties / values are the same as the action creator itself
    });
};

//Updated flow: user navigates to shop page => shop component  dispatches the fetchCategoriesStart function => fetchCategoriesStart function specifically calls the createAction utility function that returns the specific Type object that ONLY has an action without a payload.
//IN ADDITION, the fetchCategoriesStart function has been modified with an additional overloaded withMatcher function that performs additional logic on the createAction utility function. Recall that withMatcher is overloaded to return the Matchable type.
//Also recall that this Matchable type has a match method => this match method is defined such that it expects to receive an action object that has been NARROWED DOWN to be the same object action object being dispatched by the createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)

//actual implementation of the withMatcher function takes the action creator function `createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)`, invokes it so that it creates an action object that looks like:
        // {
        //     type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START
        // }
//then, it extracts the "type" property (i.e. CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START), then modifies the action creator object so that it has this "type" as well as the match method that checks this extracted "type" from the "type property" of the action that was dispatched i.e. does CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START === CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START ??

//If the actions match (which they absolutely will due to the type narrowing), then return a new state object spreading over the previous state values. and set isLoading to true

//Same logic applies to fetchCategoriesSuccess. We have a category saga that specifically listens when CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START is dispatched, which fetchCategoriesStart does. This saga immediately responds by calling the fetchCategoriesAsync function, which is responsible for fetching the categories array data from firebase, and stores this data in varible categoriesArray
//From here, it will either succeed or fail. If it is successful, then fetchCategoriesAsync will run the fetchCategoriesSuccess function that our reducer is now listening for.
//fetchCategoriesSuccess is executed, which dispatches createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
//Similarly, fetchCategoriesSuccess uses the overloaded withMatcher function + Matchable Type that performs double duty on createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray) 

//=> withMatcher takes this action, invokes it, extracts CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS from the "type" value, casts it to a variabl. Next, it uses Object.assign on the action creator object to attach to it the extracted type so that it can then check this extracted type against it's own type, essentially doing CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS === CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS. If the actions match (which they absolutely will due to type narrowing), then return a new state object spreading over the previous state values, set categoriesArray property action on the payload, and set isLoading to false
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState => {
    if(fetchCategoriesStart.match(action)){
        return {
            ...state,
            isLoading: true
        };
    };

    if(fetchCategoriesSuccess.match(action)){
        return {
            ...state,
            categoriesArray: action.payload,
            isLoading: false
        };
    };

    if(fetchCategoriesFailed.match(action)){
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    };

    return state;

    // const {type, payload} = action;

    // switch(action.type){
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
    //         return {
    //             ...state,
    //             isLoading: true
    //         }
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return {
    //             ...state,
    //             categoriesArray: action.payload, // categoriesArray: categoriesArray
    //             isLoading: false,
    //         }
    //     case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
    //         return {
    //             ...state,
    //             error: action.payload,
    //             isLoading: false,
    //         }
    //     default:
    //         return state;
    // };
};