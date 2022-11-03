import { ReduxModule } from 'src/store/types';

import reducers from './reducers';
import { articleSaga } from './sagas';

/**
 * Article redux state.
 */
export interface ArticleState {
  article: ReturnType<typeof reducers>;
}

/**
 * Article module.
 */
export const articleModule: ReduxModule<ArticleState> = {
  id: 'article',
  reducers: {
    article: reducers,
  },
  saga: [articleSaga],
};
