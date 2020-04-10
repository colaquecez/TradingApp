import { createStore, combineReducers } from 'redux';

import { CategoriesReducer } from '../categories/'
import { UserReducer } from '../user'

const rootReducers = combineReducers({
    categories: CategoriesReducer,
    user: UserReducer
});

export default createStore(rootReducers);