import { RootState } from 'src/store';
import { ReqCategoryArticles, RespCategoryArticlesList } from './types';

export const articles = (state: RootState): RespCategoryArticlesList | null =>
	state.category.list.success;
export const getArticlesListRequest = (
	state: RootState
): ReqCategoryArticles | null => state.category.list.request;
export const getArticlesListFailure = (state: RootState): string | null =>
	state.category.list.failure;
