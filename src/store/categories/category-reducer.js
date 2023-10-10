import { CATEGORY_ACTION_TYPES } from "./category-types";

export const CATEGORIES_INITIAL_STATE = {
    categoriesArray: [],
    isLoading: false,
    error: null,
};

//moving to asynchronous redux-thunk. Use thunk wherever there are asynchronous actions happening, such as getting data from firestore.
// modify actions to include 3 action types (starting to fetch categories + successfully fetching categories + if fetching categories failed)
//when fetching categories starts or begins, then isLoading is true
// if fetching categories is successful, then isLoading is now false because it's done. Set categoriesArray to the payload as we had before
// if fetching categories failed, then isLoading is also false to stop loading, and set error to the payload
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categoriesArray: payload, // categoriesArray: categoriesArray
                isLoading: false,
            }
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false,
            }
        default:
            return state;
    };
};