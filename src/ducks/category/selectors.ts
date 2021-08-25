import { IListArticlesAwareState } from './module';
import { ReqCategoryArticles, RespCategoryArticlesList } from './types';

export const articles = (
	state: IListArticlesAwareState
): RespCategoryArticlesList | null =>
	state.listCategoryArticles ? state.listCategoryArticles.success : null;
export const getArticlesListRequest = (
	state: IListArticlesAwareState
): ReqCategoryArticles | null =>
	state.listCategoryArticles ? state.listCategoryArticles.request : null;
export const getArticlesListFailure = (
	state: IListArticlesAwareState
): string | null =>
	state.listCategoryArticles ? state.listCategoryArticles.failure : null;
