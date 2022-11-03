import { ReduxModule } from 'src/store/types';

import reducers from './reducers';
import { categorySaga } from './sagas';

/**
 * Category redux state.
 */
export interface CategoryState {
  category: ReturnType<typeof reducers>;
}

/**
 * Category module.
 */
export const categoryModule: ReduxModule<CategoryState> = {
  id: 'category',
  reducers: {
    category: reducers,
  },
  saga: [categorySaga],
};
