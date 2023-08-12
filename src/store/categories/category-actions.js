import { CATEGORY_ACTION_TYPES } from "./category-types";
import { createAction } from "../../utilities/reducer-utilities";

import { getCategoriesAndDocuments } from "../../utilities/firebase/firebase.utilities";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//moving to asynchronous redux-thunk. Use thunk wherever there are asynchronous actions happening, such as getting data from firestore.
// modify actions to include 3 action types (starting to fetch categories + successfully fetching categories + if fetching categories failed)
//when fetching categories starts or begins, then isLoading is true
// if fetching categories is successful, then isLoading is now false because it's done. Set categoriesArray to the payload as we had before
// if fetching categories failed, then isLoading is also false to stop loading, and set error to the payload

export const setCategoriesArray = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES_ARRAY, categoriesArray);

export const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START); // no need to pass payload here because in the reducer, we simply just set isLoading to true

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// creating thunk function. Is a function that returns a function that gets a dispatch. Can be an async function
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    };
    
};