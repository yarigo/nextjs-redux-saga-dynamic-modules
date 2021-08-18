import { createAsyncAction } from 'typesafe-actions';

import { ReqCategoryArticles, RespCategoryArticlesList } from './types';

export const getArticles = createAsyncAction(
	'CATEGORY/GET_ARTICLES_REQUEST',
	'CATEGORY/GET_ARTICLES_SUCCESS',
	'CATEGORY/GET_ARTICLES_FAILURE',
	'CATEGORY/GET_ARTICLES_CANCEL'
)<ReqCategoryArticles, RespCategoryArticlesList, string | null, undefined>();
