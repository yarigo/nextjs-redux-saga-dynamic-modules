import { ReduxModule } from 'src/store/types';

import reducers from './reducers';

/**
 * App redux state.
 */
export interface AppState {
  app: ReturnType<typeof reducers>;
}

/**
 * App module.
 */
export const appModule: ReduxModule<AppState> = {
  id: 'app',
  reducers: {
    app: reducers,
  },
};
