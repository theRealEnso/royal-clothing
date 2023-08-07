import { CATEGORY_ACTION_TYPES } from "./category-types";

const CATEGORIES_INITIAL_STATE = {
    categoriesArray: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES_ARRAY:
            return {
                ...state,
                categoriesArray: payload // categoriesArray: categoriesArray
            }
        default:
            return state;
    };
};