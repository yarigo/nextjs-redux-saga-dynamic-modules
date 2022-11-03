import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReqCategoryArticles } from 'src/api/category/types';

import { InitialState } from './types';

export const initialState: InitialState = {
  articles: {
    request: false,
    success: null,
    failure: false,
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    /**
     * Category, get request.
     */
    categoryRequest: (state, _action: PayloadAction<ReqCategoryArticles>) => {
      state.articles.request = true;
      state.articles.success = null;
      state.articles.failure = false;
    },

    /**
     * Category, get success.
     */
    categorySuccess: (
      state,
      action: PayloadAction<InitialState['articles']['success']>
    ) => {
      state.articles.request = false;
      state.articles.success = action.payload;
      state.articles.failure = false;
    },

    /**
     * Category, get failure.
     */
    categoryFailure: (state) => {
      state.articles.request = false;
      state.articles.success = null;
      state.articles.failure = true;
    },

    /**
     * Category, abort request.
     */
    categoryAbort: (state) => {
      state.articles.request = false;
      state.articles.success = null;
      state.articles.failure = false;
    },
  },
});

namespace CategoryActions {
  export const {
    categoryRequest,
    categorySuccess,
    categoryFailure,
    categoryAbort,
  } = categorySlice.actions;
}

export { CategoryActions };

export default categorySlice.reducer;
