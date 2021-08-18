import { RootState } from 'src/store';

import { RespArticle, RespArticlesList } from './types';

export const articles = (state: RootState): RespArticlesList | null =>
	state.article.list.success;
export const getArticlesListRequest = (state: RootState): boolean =>
	Boolean(state.article.list.request);
export const getArticlesListFailure = (state: RootState): string | null =>
	state.article.list.failure;

export const article = (state: RootState): RespArticle | null =>
	state.article.item.success;
export const getArticleRequest = (state: RootState): number | null =>
	state.article.item.request;
export const getArticleFailure = (state: RootState): string | null =>
	state.article.item.failure;
