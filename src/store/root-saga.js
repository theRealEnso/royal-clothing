import {all, call} from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSaga } from './user/user-saga';

export function* rootSaga(){ // root saga automatically listens for categoriesSaga + userSaga functions, which drills downwards into the other generator functions that are hooked up
    yield all([call(categoriesSaga), call(userSaga)]);
};