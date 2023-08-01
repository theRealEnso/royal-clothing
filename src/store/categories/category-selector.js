//when working with redux, need to move code that handles business logic into selectors. This way, we can define multiple selectors that do different things. This allows us to (if needed) in the future implement new selector functions that perhaps use the data differently, or perhaps extract different parts of data and do something else with it

// Since we are working with redux, we modified the getCategoriesAndDocuments function to just get the basic data and return an array of 5 giant product objects. Originally, this function also returned a map object all in one go, but we are moving that logic into a selector here

// => Reminder that nested in each product object is another object with title keys w/ string values of product category names + items key w/ value of array of product objects tied to that category))

import {createSelector} from 'reselect';

//how reselect works => creates a 'memoized' selector => memoization is the process of caching / storing the previous value of something. When a derived data selector is created using createSelector, it automatically memoizes the output. Memoization means that if the input selectors' values haven't changed since the last invocation, the selector will return the previously cached result instead of recomputing it. This caching mechanism improves performance by avoiding unnecessary recomputations, which in turn, avoids react components from needlessly re-rendering

const extractCategoryReducer = (state) => state.categories; //input selector to be used

export const selectCategories = createSelector([extractCategoryReducer], (categoriesSlice) => categoriesSlice.categoriesArray); // makes a memoized selector => createSelector is a function that has two arguments; First, it takes an array of input selectors (can have multiple selectors) and second is the result function. The result function RECEIVES the RESULTS of the input selectors as arguments, then performs some operation or computation on those arguments

// In this case, the result function receives the result of extractCategoryReducer(state.categories) and stores it in categoriesSlice as an argument. It then proceeds to extract categoriesArray property from categoriesSlice a.k.a state.categories,  essentially doing state.categories.categoriesArray

// => selectCategories is now a memoized selector

//creating another memoized selector. This one receives the previously memoized selectCategories selector as an input. The result function for this selector receives the result of selectCategories as an argument (which again is the categoriesArray) and then proceeds to perform the reduce logic on this array
export const selectCategoriesMap = createSelector([selectCategories], (categoriesArray) => categoriesArray.reduce((accumulator, category) => {
    const {title, items} = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
    }, {})
);

//what this ultimately does is, if the categories from the redux store state hasn't actually changed, data hasn't been added or deleted, then do NOT recompute

/////       OLD CODE BEFORE MEMOIZING   ////////////////////

// export const selectCategoriesMap = (state) => state.categories.categoriesArray.reduce((accumulator, category) => {
//     const {title, items} = category;
//     accumulator[title.toLowerCase()] = items;
//     return accumulator;
// }, {});

//Currently, every time this selector runs, the logic that reduces over the categories array re-runs, and returns a new net map object every time, despite the categories array never changing. Since a new net object gets returned every time, this will cause React to unnecessarily re-render components. 

// Meaning that, as it currently stands, whenever the user navigates to, away from, and back to Shop, and the Categories Preview component is rendered again, useSelector returns a new categoriesMap object every single time even though the actual data does not change, forcing React to re-render the "new" object. 

// Likewise, it is the same with the Category component--when user navigates to, away from, and then back to View More and the Category component is rendered on the screen again, useSelector returns a brand new categoriesMap object. It is unable to cache or store value and use the same cached value to avoid unnecessary re-renders. This is where the re-select library + the concept of memoization comes in