import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import { Action } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';
import { SagaMiddleware } from 'redux-saga';

import { ExtendedEnhancedStore } from 'src/store/types';

export interface GetServerSideCallback<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> {
  (
    store: ExtendedEnhancedStore<any, Action<any>, SagaMiddleware<object>[]>,
    context: GetServerSidePropsContext<Q, D>
  ): Promise<GetServerSidePropsResult<P>>;
}

export interface GetServerSideWrapper {
  (
    store: ExtendedEnhancedStore<any, Action<any>, SagaMiddleware<object>[]>,
    callback?: GetServerSideCallback
  ): GetServerSideProps;
}
