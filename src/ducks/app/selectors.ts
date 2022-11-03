import { createSelector } from '@reduxjs/toolkit';

import { AppState } from './module';

namespace AppSelectors {
  /**
   * Return app version.
   */
  export const versionSelector = createSelector(
    [(state: AppState) => state.app],
    (state) => state.version
  );

  /**
   * Return event data.
   */
  export const eventSelector = createSelector(
    [(state: AppState) => state.app],
    (state) => state.event
  );
}

export { AppSelectors };
