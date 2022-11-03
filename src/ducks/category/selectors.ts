import { createSelector } from '@reduxjs/toolkit';

import { CategoryState } from './module';
import { initialState } from './reducers';

namespace CategorySelectors {
  /**
   * Return articles list.
   */
  export const articles = createSelector(
    [
      (state: Partial<CategoryState>) =>
        state.category ? state.category : initialState,
    ],
    (state) => state.articles
  );
}

export { CategorySelectors };
