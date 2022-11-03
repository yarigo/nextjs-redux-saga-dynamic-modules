import { GetServerSidePropsResult } from 'next';
import { END } from 'redux-saga';

import { main } from './main';
import { mergeServerSideResult } from './mergeServerSideResult';
import { GetServerSideWrapper } from './types';

// Public SSR wrapper.
export const PublicWrapper: GetServerSideWrapper =
  (store, callback) => async (ctx) => {
    let result: GetServerSidePropsResult<{ [key: string]: any }> = {
      props: {},
    };

    // Runs all other callback.
    const promise = [main];

    const data = await Promise.all(promise.map((item) => item(store, ctx)));

    result = mergeServerSideResult(...data, result);

    // Append page definition callback.
    let pageData: GetServerSidePropsResult<{ [key: string]: any }>[] = [];

    if (callback) {
      pageData.push(await callback(store, ctx));
    }

    // Close saga listener.
    store.dispatch(END);

    return mergeServerSideResult(...pageData, result);
  };
