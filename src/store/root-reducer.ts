import { combineReducers } from 'redux';

import article from 'src/ducks/article/reducer';
import category from 'src/ducks/category/reducer';

export const rootReducer = combineReducers({ article, category });
