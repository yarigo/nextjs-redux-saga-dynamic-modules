import { createSelector } from '@reduxjs/toolkit';

import { ArticleState } from './module';
import { initialState } from './reducers';

namespace ArticleSelectors {
  /**
   * Return article.
   */
  export const article = createSelector(
    [
      (state: Partial<ArticleState>) =>
        state.article ? state.article : initialState,
    ],
    (state) => state.article
  );

  /**
   * Return articles list.
   */
  export const articles = createSelector(
    [
      (state: Partial<ArticleState>) =>
        state.article ? state.article : initialState,
    ],
    (state) => state.articles
  );
}

export { ArticleSelectors };
