import {all, call} from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';

export function* rootSaga(){ // root saga automatically listens (?) for categoriesSaga, which drills downwards into the other generator functions that are hookedup
    yield all([call(categoriesSaga)]);
};