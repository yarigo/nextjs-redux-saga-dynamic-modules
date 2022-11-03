import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState } from './types';

export const initialState: InitialState = {
  article: {
    request: false,
    success: null,
    failure: false,
  },
  articles: {
    request: false,
    success: null,
    failure: false,
  },
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    /**
     * Article, get request.
     */
    articleRequest: (state, _action: PayloadAction<number>) => {
      state.article.request = true;
      state.article.success = null;
      state.article.failure = false;
    },

    /**
     * Article, get success.
     */
    articleSuccess: (
      state,
      action: PayloadAction<InitialState['article']['success']>
    ) => {
      state.article.request = false;
      state.article.success = action.payload;
      state.article.failure = false;
    },

    /**
     * Article, get failure.
     */
    articleFailure: (state) => {
      state.article.request = false;
      state.article.success = null;
      state.article.failure = true;
    },

    /**
     * Article, abort request.
     */
    articleAbort: (state) => {
      state.article.request = false;
      state.article.success = null;
      state.article.failure = false;
    },

    /**
     * Articles list, get request.
     */
    articlesRequest: (state, _action: PayloadAction<number>) => {
      state.articles.request = true;
      state.articles.success = null;
      state.articles.failure = false;
    },

    /**
     * Articles list, get success.
     */
    articlesSuccess: (
      state,
      action: PayloadAction<InitialState['articles']['success']>
    ) => {
      state.articles.request = false;
      state.articles.success = action.payload;
      state.articles.failure = false;
    },

    /**
     * Articles list, get failure.
     */
    articlesFailure: (state) => {
      state.articles.request = false;
      state.articles.success = null;
      state.articles.failure = true;
    },

    /**
     * Articles list, abort request.
     */
    articlesAbort: (state) => {
      state.articles.request = false;
      state.articles.success = null;
      state.articles.failure = false;
    },
  },
});

namespace ArticleActions {
  export const {
    articleRequest,
    articleSuccess,
    articleFailure,
    articleAbort,
    articlesRequest,
    articlesSuccess,
    articlesFailure,
    articlesAbort,
  } = articleSlice.actions;
}

export { ArticleActions };

export default articleSlice.reducer;
