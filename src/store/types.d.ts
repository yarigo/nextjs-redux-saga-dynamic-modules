import {
  Action,
  AnyAction,
  CombinedState,
  EnhancedStore,
  Middleware,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';

/**
 * Reducers map object.
 */
export type ManagerReducersMapObject<
  S = any,
  A extends Action<any> = Action<any>
> = {
  [K in keyof S]: {
    reducer: Reducer<S[K], A>;
    count: number;
  };
};

/**
 * Redux module.
 */
export interface ReduxModule<T> {
  /**
   * Module id.
   */
  id: string;
  /**
   * Reducers list.
   */
  reducers: ReducersMapObject<T>;
  /**
   * Saga list.
   */
  saga?: Saga[];
}

/**
 * Reducer manager.
 */
export interface IReducerManager {
  /**
   * The root reducer function exposed by this object.
   * This will be passed to the store.
   */
  reduce: (state: any, action: AnyAction) => CombinedState;

  /**
   * Adds a new reducer.
   */
  add: (...reducer: ReduxModule<T>[]) => void;

  /**
   * Remove a reducer.
   */
  remove: (...reducer: ReduxModule<T>[]) => void;
}

declare type Middlewares<S> = ReadonlyArray<Middleware<{}, S>>;

/**
 * Extended enhanced store interface.
 */
export interface ExtendedEnhancedStore<
  S = any,
  A extends Action<any> = AnyAction,
  M extends Middlewares<S> = Middlewares<S>
> extends EnhancedStore<S, A, M> {
  reducerManager: IReducerManager;
}

/**
 * Store configuration options.
 */
export interface ConfigureStoreOptions {
  /**
   * Initial modules.
   */
  reducer: ReduxModule<T>[];
  /**
   * Verbose mode.
   *
   * @default false
   */
  verbose?: boolean;
}

/**
 * Management of redux modules.
 */
export interface ICreateStore {
  (options: ConfigureStoreOptions): ExtendedEnhancedStore;
}
