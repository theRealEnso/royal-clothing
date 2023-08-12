import {compose, legacy_createStore, applyMiddleware} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {rootReducer} from './root-reducer';

import { loggerMiddleware } from './middleware/logger';

import thunk from 'redux-thunk';
///////////////////////////////////////////////////////////////////////////////

const persistConfig = {
    key: 'root', // root = persist the whole thing, starting from the root level
    storage, // browsers use local storage by default. Shorthand for storage: storage
    whitelist: ['cart'],
    // blacklist: ['user'] // what we don't want to persist goes in the blacklist. Blacklisting user b/c user is being handled by onAuthStateChangedListener. This might conflict with local storage. Is an array of strings of reducer keys
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, thunk].filter(Boolean); //filter out anything that is not true / is falsy.
//In other words, if our process environment is in development, then alow loggerMiddleware to function. If it is changed to 'production' then loggerMiddleware will not show

//implement chrome extension redux-devtools => if we are in development, and there is a window object, and redux devtools exist, then use this composeEnhancer from redux devtools. Otherwise, just use compose from redux as we did initially
const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

// export const store = legacy_createStore(rootReducer, undefined, composedEnhancers)

