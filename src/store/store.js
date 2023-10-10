import {compose, legacy_createStore, applyMiddleware} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {rootReducer} from './root-reducer';

import { loggerMiddleware } from './middleware/logger';

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga';

// import thunk from 'redux-thunk';

///////////////////////////////////////////////////////////////////////////////

const persistConfig = {
    key: 'root', // root = persist the whole thing, starting from the root level
    storage, // browsers use local storage by default. Shorthand for storage: storage
    whitelist: ['cart'],
    // blacklist: ['user'] // what we don't want to persist goes in the blacklist. Blacklisting user b/c user is being handled by onAuthStateChangedListener. This might conflict with local storage. Is an array of strings of reducer keys
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter(Boolean);

//implement chrome extension redux-devtools => if we are in development, and there is a window object, and redux devtools exist, then use this composeEnhancer from redux devtools. Otherwise, just use compose from redux as we did initially
const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

//////////  OLD SET UP WITH ROOT REDUCER BEFORE USING PERSISTED REDUCER     /////////////////////////////////////////////

// export const store = legacy_createStore(rootReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters

