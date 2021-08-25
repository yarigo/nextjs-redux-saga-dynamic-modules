import { IItemArticleAwareState, IListArticlesAwareState } from './module';
import { RespArticle, RespArticlesList } from './types';

export const articles = (
	state: IListArticlesAwareState
): RespArticlesList | null =>
	state.listArticles ? state.listArticles.success : null;
export const getArticlesListRequest = (
	state: IListArticlesAwareState
): boolean =>
	state.listArticles ? Boolean(state.listArticles.request) : false;
export const getArticlesListFailure = (
	state: IListArticlesAwareState
): string | null => (state.listArticles ? state.listArticles.failure : null);

export const article = (state: IItemArticleAwareState): RespArticle | null =>
	state.itemArticle ? state.itemArticle.success : null;
export const getArticleRequest = (
	state: IItemArticleAwareState
): number | null => (state.itemArticle ? state.itemArticle.request : null);
export const getArticleFailure = (
	state: IItemArticleAwareState
): string | null => (state.itemArticle ? state.itemArticle.failure : null);
