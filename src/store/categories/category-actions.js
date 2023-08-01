import { CATEGORY_ACTION_TYPES } from "./category-types";
import { createAction } from "../../utilities/reducer-utilities";

export const setCategoriesArray = (categoriesArray) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES_ARRAY, categoriesArray);