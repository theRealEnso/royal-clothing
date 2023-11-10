import { AnyAction } from "redux"; //AnyAction is a generic `type` in Redux that represents an action object. It represents any possible action that can be dispatched in a Redux store. Its purpose is to provide flexibiity in working with actions, which allows us to work with different action types without specifying their exact shape. There are action objects that only have a type, actions that have a type and a payload, and even action objects that have properties other than a type and a payload. However, this flexibility comes with a lack of type safety with Redux because it doesn't enforce a specific action structure., hence the need to define specific typescript types with well-defined structures

//reminder that `types` in typescript are a way of coding out objects

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Right, so what the heck are we trying to achieve with TS? We need typeguards against all of the different actions that can fire off and hit our reducers. Our old reducer(s) are set up to only handle specific actions. For example, the category reducer responds to action with type(s) CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START / FETCH_CATEGORIES_SUCESS / FETCH_CATEGORIES_FAILED. But, we know in our app, any other actions can fire off and hit the reducers, such as redux persist / re-hydrate, actions can fire off from any additional middlewares we have, etc. There are no type guards against these. So, what we want to do is get more specific with typescript and narrow down the actions that our reducers respond to. We only want, for example, the category reducer to ONLY respond to those 3 specific actions, and nothing else. We aim to do this by modifying our action creator functions and EXTENDING TO THEM the ability to check the action it receives against the action they create--In other words, our action creator functions generate actions per usual, but now,  they will also type check against the actions that they hold. 

//We achieve this by defining some type named Matchable, and applying concepts of Generics, Type Predicates, Intersection Types, and Return Types

// Generics use the angle brackets < > => its basically a "type" parameter that can be used throughout the rest of a function inside of its definitions for types. Generics are a TypeScript feature that allows us to pass in various types of data (eg numbers, strings, booleans, arrays...) as a GENERIC variable, lets say T, and create reusable code to handle different inputs. They allow us to define placeholder types which are then replaced when the code is executed with the actual types passed in. This is useful for many cases because in many instances, we want to genericize our functions so that TS can work with ANY data type... whatever is passed in as T, TS compiler will automatically examine the data type that is passed in as T, and use that data type throughout the rest of the function.It is common to use T as a parameter name, but parameter names can be named anything.

//Type predicates uses the `is` keyword. Is sort of like a function that verifies whether a specific argument it receives is of a narrower / more specific type

//Intersection types basically means joining two types together using the "&" keyword, essentially creating a hybrid. It allows something to have all of the properties of two separate types.
//Return Types uses TS's ReturnType keyword. Can pass in any value into ReturnType, and ReturnType will return back to us whatever value was passed in

//OK, lets break down this Matchable type First, It takes a Generic of AC (which for us, stands for Action Creator). AC is a placeholder parameter, and we will be passing in our actual action creator functions in our category-action.tsx file (i.e fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed)

// The extends keyword is used to say that the AC will take will be of `type` function data type, which returns on action object that takes on the shape of the general + flexible AnyAction from Redux. In other words, know that this action creator function, AC, is going to be some function that returns back an action object of `type` AnyAction. AnyAction is a generic type in Redux that represents an action object that can have any number of parameters

//What we ultimately want this Matchable object to be is the AC action creator function(s) itself that has the general flexible shape of AnyAction from Redux, that is also INTERSECTED with another "type" object that has two additional properties-- a "type" property, which is going to have a type value of Action Creater (aka get the action itself), as well as a "match" method 

//Next, we leverage the fact that functions in JS are essentially objects, and we can attach the `match` method to attach additional properties / functions to an object. The match method expects to receive an action object of `type` AnyAction and determine if it matches the action created by the AC action creator (using type predicate)
//If the condition `action is ReturnType<AC>` is true, TypeScript knows that the action is of the same type as the action created by the action creator, and it can provide type checking and inference accordingly. This helps ensure type safety when working with Redux actions and reduces the chance of runtime errors related to additional different action types that can be dispatched that aren't specifically defined/handled in the reducer

//this Matchable type will be the EXTENSION we are adding onto our actual action creator functions (such as fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed)

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type']; //ReturnType comes from TS. Here, we the value we get back is the action object of the AC, and then we use ['type'] to pull off the type property/value from the object
    match(action: AnyAction): action is ReturnType<AC>
};

// function overloading withMatcher function. We are defining all of the various action creators we might receive
//This first overloaded function handles instances where action creators don't receive any arguments/inputs. For example, fetchCategoriesStart does not receive any arguments
//withMatcher function takes a Generic AC parameter
//The extends keyword is used to specify a constraint on AC. It requires AC to be a type that extends from a specific shape or type. In this case, it enforces two constraints:
//      1.) AC must be a function type (i.e., () => ...) because the constraint starts with ().
//      2.) The return type of the function (AC) must be an action object where the `type` property inside the object is of a string data type
//      This constraint ensures that AC is a function that returns an action object with a type property of that is of a string data type. It provides a type check for the shape of the action creator function.

//Next, this overloaded function takes a single argument `actionCreator`. This argument is a placeholder, will be passing in our actual action creator functions in category-actions file (fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed). We assign the Generic AC to the actionCreator parameter, because we want our action creator functions to have this type
//Finally, what we get back is a Matchable type object of the AC type
export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

//This next overloaded function is for instances where action creators DO receive arguments/inputs (i.e fetchCategoriesSuccess receives categoriesArray, fetchCategoriesFailed receives an error)
// Same as above, except the `(...args: any[])`  means that AC must be a of a function type that accepts any number of arguments--we are accumulating any n number of arguments and concatenating them into an array, then using the any keyword plus the [] to tell TS that the data types of the arguments could be anything in the array
//The return type of the function AC must be an action object where the `type` property inside of the object is of a string data type
//Again, what we get back is a Matchable type object of the AC type
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

//this function is the actual implementation. It takes a more general argument `actionCreator` of `type` Function (again, we are passing in our action creator functions in category-actions file)
//It calls whatever function that is being passed into the actionCreator placeholder, which gets an action object, which then gets the "type" property off of that action object, and then casts it to a variable named "type"
//Next, It returns a new object that combines the actionCreator function with two additional properties: `type` and `match, where `type` is the type property extracted from the action created by the actionCreator and `match(action: AnyAction)`, which is a function that checks if the provided action has the same type as the actionCreator.
//Ultimately, withMatcher is a function that takes an Action Creator function and adds an additional functionality to them. This additional functionality is meant to determine if a passed action creator function has the same type as the corresponding action that they create
export function withMatcher(actionCreator: Function){
    const type = actionCreator().type;
    //use Object.assign to take the action creator, and modify it so that it has the extracted type as well as the match method
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    });
};

// Define two different explicit action object types-- one action type that specifically has a payload, and another that does not have a payload
// some actions don't have a payload. With typescript, we need to be specific. Actions that don't necessarily have a payload need to be typed differently
// <T, P> are Generic parameters that get passed in to the type, similar to how functions with parameters get passed in
// So, whenever we call this ActionWithPayload, the T value is going to be one of the enum values in the category-types file that we are going to pass in as T. P will be whatever payload we want
export type ActionWithPayload<T,P> = {
    type: T;
    payload: P;
};


export type Action<T> = {
    type: T;
};

// The following lines of code involve FUNCTIONAL OVERLOADING (comes from typescript, not JS). This allows us to create multiple function type definitions of the same name, but allows each one to receive different parameter types. They should all always have the same number of parameters (in this case, createAction there's always a type and a payload), but now it can return different types depending on different parameter types we receive. Cannot use arrow function syntax, must use classic function declarations.

// So, depending on whether or not createAction receives a payload, we want to return the appropriate action--either an ActionWithPayload type if there is a payload, or just an Action type if there is no payload

// For this overloaded function, here we are saying: If createAction gets called with a type and a payload, then the return action object type from this function will be ActionWithPayload<T,P> with T being one of the enum values in category-types file being passed in as T, and P being passed in as whatever payload. We know T (enum values) is a string, so we extend T as a string
//`T extends string`: This part of the function specifies that the `type` argument must be of a string data type.
//`P` is a generic type parameter that represents the payload data.
// It takes two arguments: type and payload, then it the colon `: ActionWithPayload<T, P>` says that it returns an ActionWithPayload object type, which includes the provided type and payload.
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;


//For this overloaded function, here we are saying: If createAction gets called with just only a type, then the return type from this function will be Action<T> with T being one of the enum values in category-types file being passed in as T. We know that T (enum values) is a string, so we again extend it as a string
// Even though there is no P value, we can't leave the payload parameter, so we pass void to it. Remember that void means we are not expecting anything, so in this case, we are not expecting a payload value
// `T extends string` : This part specifies that the type argument must be a string.
//`payload: void` - This specifies that the payload should be void, meaning there is no associated data.
//It takes two arguments-- type and payload, but the payload argument is effectively ignored.
//here, it returns only  an Action object type with just the provided type.
//This function is used when we want to create a simple action without any associated payload data.
export function createAction<T extends string>(type: T, payload: void): Action<T>;


//This is the actual implementation of what we want createAction to do. Is the TS equivalent of the old helper function in the old code. Helper function still takes a type and a payload as inputs, and returns a new object setting type to type, and payload to payload. Except this time, it can be overloaded with the above two, and can spit out different action type objects depending on which parameters are passed in
//We say T extends string in the Generic because we know that our types are always strings.
// Top two can be thought of as different slices of this same main function that performs differently depending on whether or not the action has a payload
export function createAction<T extends string, P>(type: T, payload: P){
    return {type, payload};
};











//old code before implementing typescript ////////////////////////////////////////////////////////////////////////////////////////////////

// export const createAction = (type, payload) => ({type, payload});

/* // export const createAction = (type, payload) => {
//     return {
//         type: type,
//         payload: payload
//     };
// };

// achieves the same thing as above. Despite this difference in syntax, both functions will accomplish the same task of creating an object with "type" and "payload" properties. The first function's syntax is more concise and is often used when the property names and variable names / key-value names match. */