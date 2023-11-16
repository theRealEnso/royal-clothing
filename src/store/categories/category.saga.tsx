// import {takeLatest, all, call, put} from 'redux-saga/effects';

import {takeLatest, all, call, put} from 'typed-redux-saga';

import { getCategoriesAndDocuments } from '../../utilities/firebase/firebase.utilities';

import {fetchCategoriesSuccess, fetchCategoriesFailed} from './category-actions';
import {CATEGORY_ACTION_TYPES} from './category-types'
import { Category } from './category-types';

export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments); // yield* is like await in async await. Is sort of like an ability to pause functions. Since getCategoriesAndDocuments is asynchronous, we wait until it resolves before continuing. Need to also use call from redux-saga to fire off effect

        // no need to add parens when using call on another function, breaks code => i.e. don't do yield* call(getCategoriesAndDocuments());
        yield* put(fetchCategoriesSuccess(categoriesArray as Category[])); // put essentially replaces dispatch, categoriesArray as Category[] fixes error, tells TS that it can trust me that categoriesArray is of the type Category[]
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    };
};

export function* onFetchCategories(){
    yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
    // takeLatest says, "if I have a bunch of repeated actions, then just give me the latest one"
    // takes two arguments 1.) the actual action type we want to respond to and 2.) what we want to actually happen
    // => the moment we hear fetch categories start, then run the fetchCategoriesAsync function
};

// whenever we take the latest FETCH_CATEGORIES_START action, initialize the fetchCategoriesAsync saga, which attempts to get the categories array from firebase.
// if succesful, then put AKA dispatch the fetchCategoriesSuccess action with the categories array
// if failed, then put AKA dispatch the fetchCategoriesFailed with the error
// these actions go back into the redux flow, update reducers, or any sagas listening to these actions

export function* categoriesSaga(){
    yield* all([call(onFetchCategories)]); // all is an effect that runs everything inside, and only complete when all of it is done
};

// old thunk
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     };
    
// };