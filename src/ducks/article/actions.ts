import { createAsyncAction } from 'typesafe-actions';

import { RespArticle, RespArticlesList } from './types';

export const getArticles = createAsyncAction(
	'ARTICLE/GET_LIST_REQUEST',
	'ARTICLE/GET_LIST_SUCCESS',
	'ARTICLE/GET_LIST_FAILURE',
	'ARTICLE/GET_LIST_CANCEL'
)<number, RespArticlesList, string | null, undefined>();

export const getArticle = createAsyncAction(
	'ARTICLE/GET_REQUEST',
	'ARTICLE/GET_SUCCESS',
	'ARTICLE/GET_FAILURE',
	'ARTICLE/GET_CANCEL'
)<number, RespArticle, string | null, undefined>();
