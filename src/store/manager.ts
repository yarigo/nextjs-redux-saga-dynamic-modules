import { AnyAction, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import createSageMiddleware, { Task } from 'redux-saga';

import {
  ExtendedEnhancedStore,
  ICreateStore,
  IReducerManager,
  ManagerReducersMapObject,
} from './types';

/**
 * Convert management reducers to map reducers.
 *
 * @param props reducer with count of depends
 * @returns map of reducers
 */
const reducersToReducersMap = (
  props: ManagerReducersMapObject
): ReducersMapObject => {
  const reducers = Object.entries(props).map((item) => [
    item[0],
    item[1].reducer,
  ]);

  return Object.fromEntries(reducers);
};

/**
 * Get combine reducer from manager reducers.
 *
 * @param props reducer with count of depends.
 * @returns reducer
 */
const combineReducers = (props: ManagerReducersMapObject) => {
  const reducers = reducersToReducersMap(props);

  const reducerKeys = Object.keys(reducers);

  return (state: { [key: string]: any } = {}, action: AnyAction) => {
    const nextState: { [key: string]: any } = {};

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i++) {
      // Get the current key name
      const key = reducerKeys[i];
      // Get the current reducer
      const reducer = reducers[key];
      // Get the the previous state
      const previousStateForKey = state[key];
      // Get the next state by running the reducer
      const nextStateForKey = reducer(previousStateForKey, action);
      // Update the new state for the current reducer
      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
};

// Increment counter.
const increment = (obj: ManagerReducersMapObject, key: string) => {
  Object.keys(obj)
    .filter((item) => item === key)
    .forEach((item) => obj[item].count++);
};

// Decrement counter.
const decrement = (obj: ManagerReducersMapObject, key: string): boolean => {
  let unused = false;

  Object.keys(obj)
    .filter((item) => item === key)
    .forEach((item) => {
      if (obj[item].count === 1) {
        unused = true;
      }

      obj[item].count--;
    });

  return unused;
};

// Manager reducer events.
enum Events {
  // Loading module event.
  Loading = '@@Internal/ModuleManager/ModuleAdded',
  // Unloading module event.
  Unloading = '@@Internal/ModuleManager/ModuleRemoved',
}

/**
 * Create store with manager.
 *
 * @returns store with manager
 */
export const createStore: ICreateStore = (options) => {
  const { reducer = [], verbose = false } = options;

  // A dictionary to keep track of injected sagas.
  const injectedSaga: Map<string, Task> = new Map();

  // Check injected saga.
  const sagaIsInjected = (key: string) => injectedSaga.has(key);

  // Create saga instance.
  const sagaMiddleware = createSageMiddleware();

  // Create an object which maps keys to reducers.
  const reducers: ManagerReducersMapObject = {};

  // Apply initial reducer.
  reducer.forEach((reducer) => {
    Object.entries(reducer.reducers as ReducersMapObject).map((item) => {
      reducers[item[0]] = { reducer: item[1], count: 1 };
    });
  });

  // Store instance.
  const store = configureStore({
    reducer: reducersToReducersMap(reducers),
    middleware: [sagaMiddleware],
    devTools:
      process.env.NODE_ENV === 'development' ||
      (process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_APP_ENV === 'STAGING'),
  });

  // Apply initial sagas.
  reducer
    .filter((reducer) => typeof reducer.saga !== 'undefined')
    .forEach((reducer) => {
      reducer.saga
        ?.filter((saga) => !sagaIsInjected(saga.name))
        .forEach((saga) => {
          injectedSaga.set(saga.name, sagaMiddleware.run(saga));
        });
    });

  // Create the initial combinedReducer.
  let combinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed.
  let keysToRemove: string[] = [];

  const reducerManager: IReducerManager = {
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first.
      if (keysToRemove.length > 0) {
        state = { ...state };

        for (let key of keysToRemove) {
          delete state[key];
        }

        keysToRemove = [];
      }

      // Delegate to the combined reducer.
      return combinedReducer(state, action);
    },

    add: (...reducer) => {
      let update = false;

      reducer.forEach((reducer) => {
        if (!!reducers[reducer.id]) {
          increment(reducers, reducer.id);

          return;
        }

        update = true;

        // Append modules to reducers list.
        Object.entries(reducer.reducers as ReducersMapObject).map((item) => {
          reducers[item[0]] = { reducer: item[1], count: 1 };
        });

        // Append sagas.
        if (reducer.saga) {
          reducer.saga
            .filter((_saga, index) => !sagaIsInjected(`${reducer.id}.${index}`))
            .forEach((saga, index) => {
              injectedSaga.set(
                `${reducer.id}.${index}`,
                sagaMiddleware.run(saga)
              );
            });
        }

        // Verbose.
        if (verbose) {
          store.dispatch({ type: Events.Loading, payload: reducer.id });
        }
      });

      // Update reducer.
      if (update) {
        store.replaceReducer(combineReducers(reducers));
      }
    },

    remove: (...reducer) => {
      let update = false;

      reducer.forEach((reducer) => {
        if (!reducers[reducer.id]) {
          return;
        }

        if (decrement(reducers, reducer.id)) {
          // Update reducer.
          update = true;

          // Remove it from the reducer mapping
          delete reducers[reducer.id];

          // Add the key to the list of keys to clean up.
          if (keysToRemove.indexOf(reducer.id) < 0) {
            keysToRemove.push(reducer.id);
          }

          // Remove sagas.
          if (reducer.saga) {
            reducer.saga
              .filter((_saga, index) =>
                sagaIsInjected(`${reducer.id}.${index}`)
              )
              .forEach((_saga, index) => {
                const task = injectedSaga.get(`${reducer.id}.${index}`);
                if (task) {
                  task.cancel();

                  injectedSaga.delete(`${reducer.id}.${index}`);
                }
              });
          }

          // Verbose.
          if (verbose) {
            store.dispatch({ type: Events.Unloading, payload: reducer.id });
          }
        }
      });

      // Update reducer.
      if (update) {
        store.replaceReducer(combineReducers(reducers));
      }
    },
  };

  (store as ExtendedEnhancedStore).reducerManager = reducerManager;

  return store as ExtendedEnhancedStore;
};
