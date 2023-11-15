import {compose, legacy_createStore, applyMiddleware, Middleware} from 'redux';

import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {rootReducer} from './root-reducer';

import { loggerMiddleware } from './middleware/logger';

import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose // extension is just a type of compose. The ?: just means that its optional--client might not have this extension installed
    }
};

//intersect PersistConfig object from Redux with another type object that has whitelist property. 
//`keyof` comes from TS and is a type operator. It takes an object type and produces a string or numeric literal union of its keys
//so, gets the keys off of the RootState i.e. user / categories / cart => "user" | "categories" | "cart"
type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};

///////////////////////////////////////////////////////////////////////////////

const persistConfig: ExtendedPersistConfig = {
    key: 'root', // root = persist the whole thing, starting from the root level
    storage, // browsers use local storage by default. Shorthand for storage: storage
    whitelist: ['cart'],
    // blacklist: ['user'] // what we don't want to persist goes in the blacklist. Blacklisting user b/c user is being handled by onAuthStateChangedListener. This might conflict with local storage. Is an array of strings of reducer keys
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));

//implement chrome extension redux-devtools => if we are in development, and there is a window object, and redux devtools exist, then use this composeEnhancer from redux devtools. Otherwise, just use compose from redux as we did initially
const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

//////////  OLD SET UP WITH ROOT REDUCER BEFORE USING PERSISTED REDUCER     /////////////////////////////////////////////

// export const store = legacy_createStore(rootReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters

