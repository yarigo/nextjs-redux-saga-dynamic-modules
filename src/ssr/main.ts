import { AppActions } from '@ducks/app/reducers';

import { app } from 'src/api/app';

import { GetServerSideCallback } from './types';

export const main: GetServerSideCallback = async (store, _ctx) => {
  await app
    .Version()
    .then((data) => store.dispatch(AppActions.setVersion(data)))
    .catch((err) => console.error(err));

  return { props: {} };
};
