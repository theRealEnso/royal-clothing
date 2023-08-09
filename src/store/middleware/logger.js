//////////////////////////////////////////////////////////////////////////////

// - The loggerMiddleware function is defined as a curried function. A curried function is a function that takes multiple arguments, but instead of taking them all at once, it takes one argument at a time and returns a new function that takes the next argument. In this case, loggerMiddleware takes one argument store.

// - The first level of the curried function is (store) => {...}. This function takes the Redux store as an argument. The store object represents the Redux store, which holds the current state of the application, allows access to state through getState(), and dispatches actions to update the state.

// - The second level of the curried function is (next) => {...}. This function takes an argument called next. In Redux middleware, next is a reference to the next middleware in the chain or the actual dispatch function if there are no more middlewares. It is used to pass the action along the middleware chain. If you don't call next(action) in this middleware, the action won't be propagated to the next middleware or the reducer.

// - The third level of the curried function is (action) => {...}. This function takes the action as an argument. The action represents the object dispatched to update the state in Redux. It typically has a type property that describes the action type and a payload property that contains the data associated with the action.

export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) return next(action);

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('current state: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};

// 1.) The middleware first checks whether the action object has a type property. If there is no type, it means this action is not a standard Redux action, so the middleware simply calls next(action) to pass the action along to the next middleware or the reducer. This is to allow non-standard actions (e.g., plain objects that don't follow the typical Redux action structure) to still flow through the middleware chain.

// 2.) If the action has a type, it means it's a standard Redux action, and the middleware proceeds to log some information about the action and the current state of the store. It prints the type, payload, and the current state using console.log().

// 3.) After logging the information, the middleware calls next(action) to pass the action to the next middleware or the reducer to update the state.

// 4.)Finally, after the action has been processed by the next middleware or the reducer, the middleware logs the updated state of the store by calling store.getState() again and printing it to the console.

// The main purpose of this logger middleware is to log information about the actions and the state changes in the Redux store. It can be helpful for debugging and understanding how the actions flow through the Redux middleware chain and how the state evolves with each action dispatch.