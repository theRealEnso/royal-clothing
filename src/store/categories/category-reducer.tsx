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

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesState => {
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