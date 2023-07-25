import {compose, legacy_createStore, applyMiddleware} from 'redux';

import {rootReducer} from './root-reducer';


const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) return next(action);

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const middleWares = [loggerMiddleware]; // array of middlewares (can have multiple). Middlewares catch actions that have been dispatched before they hit the reducer, then logs the state

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(rootReducer, undefined, composedEnhancers)