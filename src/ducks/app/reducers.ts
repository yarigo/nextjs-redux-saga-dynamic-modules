import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  version: null,
  event: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * Set version.
     */
    setVersion: (state, action: PayloadAction<InitialState['version']>) => {
      state.version = action.payload;
    },

    /**
     * Set event.
     */
    setEvent: (state, action: PayloadAction<InitialState['event']>) => {
      state.event = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Hydration.
      .addCase(HYDRATE, (state, action: AnyAction) => {
        if (
          action.payload &&
          action.payload.app &&
          action.payload.app.version
        ) {
          state.version = action.payload.app.version;
        }
      });
  },
});

namespace AppActions {
  export const { setVersion, setEvent } = appSlice.actions;
}

export { AppActions };

export default appSlice.reducer;
