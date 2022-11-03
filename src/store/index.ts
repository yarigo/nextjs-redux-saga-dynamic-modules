import { createWrapper } from 'next-redux-wrapper';
import { appModule } from '@ducks/app';

import { createStore } from './manager';

export const store = createStore({
  reducer: [appModule],
  verbose:
    process.env.NODE_ENV === 'development' ||
    (process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_APP_ENV === 'STAGING'),
});

export const storeWrapper = createWrapper<typeof store>(() => store);
