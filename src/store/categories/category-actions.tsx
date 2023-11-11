import { CATEGORY_ACTION_TYPES, Category} from "./category-types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utilities/reducer-utilities";

//FetchCategoriesStart is a type of an action object. It is a specific type of action object that only has a type, no payload, so we assign to it the Action object type that specifically only type property w/o payload
export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>; // returns an action object type with the shape of {type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START}

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>; // returns shape {type: CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]}

export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

//Ok, so withMatcher reaches into the action creator function being passed to it (i.e `(): FetchCategoriesStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START`), gets the action type object of FetchCategoriesStart, and then gets the actual type from the enum (CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START), and finally sets that type to the top level

//`fetchCategoriesStart = (): FetchCategoriesStart =>` ASSIGNING FetchCategoriesStart TYPE object to the fetchCategoriesStart function. When fetchCategoriesStart is dispatched, we tell TS that we are returning the action object type of FetchCategoriesStart, which is specifically an action object type with ONLY a type property w/o a payload

//Ultimately, fetchCategoriesStart has been modified to perform double-duty.  It is now a function checks if a passed action creator function has the same type as the corresponding action that they create
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START));

//`fetchCategoriesSuccess = (): FetchCategoriesSuccess =>` ASSIGNING FetchCategoriesSuccess TYPE to the fetchCategoriesSuccess function. When fetchCategoriesSuccess is dispatched, we are returning the action object type of FetchCategoriesSuccess, which is specifically an action object type with both an action and a payload
export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));










// BEFORE TYPESCRIPT    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// export const setCategoriesArray = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES_ARRAY, categoriesArray);

// export const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START); // no need to pass payload here because in the reducer, we simply just set isLoading to true

// export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

// export const fetchCategoriesFailed = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);









/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// thunk async function before moving to saga

// import { getCategoriesAndDocuments } from "../../utilities/firebase/firebase.utilities";

// creating thunk function. Is a function that returns a function that gets a dispatch. Can be an async function. Moving logic that fetches data away from the shop component and moving this piece into a middleware thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     };
    
// };

//moving to asynchronous redux-thunk. Use thunk wherever there are asynchronous actions happening, such as getting data from firestore.
// modify actions to include 3 action types (starting to fetch categories + successfully fetching categories + if fetching categories failed)
//when fetching categories starts or begins, then isLoading is true
// if fetching categories is successful, then isLoading is now false because it's done. Set categoriesArray to the payload as we had before
// if fetching categories failed, then isLoading is also false to stop loading, and set error to the payload