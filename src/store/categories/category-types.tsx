//create enumerable object. Same as an object, except it has fixed values. Before, key-values point to strings. Instead with an enum, key values get converted to "members", meaning that the 3 values we use as keys will only be equal to the assigned options
// Allows us to capture the literal string values as the types themselves
export enum CATEGORY_ACTION_TYPES {
    FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS', //set categories array only on success
    FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED',
};

//thinking back to shape the data in categories collection we have stored in firebase => categories is an array of 5 giant objects. In each object, there is a title key with a corresponding string of the product category name. There is also an items array containing product objects--each object has a id, which is a number + imageUrl, which is a string/ + name, which is a string + price, which is a number. We need to explicitly type these out and specify their specific data types
export type CategoryItem = {
    id: number,
    imageUrl: string,
    name: string,
    price: number,
};

export type Category = {
    title: string;
    imageUrl: string,
    items: CategoryItem[]; // items is an array of CategoryItem's
};

//TS doesn't explicitly know what the accumulator object in the reduce function inside our category-selector file is. Need to define it here and then import it in that file
// key is based off of the title when we reduce over the categories array and create a map object, and we know that the title is a string data type
export type CategoryMap = {
    [key: string]: CategoryItem[]; 
};



// BEFORE TYPESCRIPT
// export const CATEGORY_ACTION_TYPES = {
//     // SET_CATEGORIES_ARRAY: 'SET_CATEGORIES_ARRAY',
//     FETCH_CATEGORIES_START: 'FETCH_CATEGORIES_START',
//     FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS', //set categories array only on success
//     FETCH_CATEGORIES_FAILED: 'FETCH_CATEGORIES_FAILED',
// };