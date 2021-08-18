import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';

import { getArticles } from './actions';
import { ReqCategoryArticles, RespCategoryArticlesList } from './types';

const handleGetArticlesListRequest = createReducer<
	null | ReqCategoryArticles,
	ActionType<typeof getArticles>
>(null)
	.handleAction(getArticles.request, (_state, action) => action.payload)
	.handleAction(
		[getArticles.success, getArticles.failure, getArticles.cancel],
		(_state, _action) => null
	);

const handleGetArticlesListSuccess = createReducer<
	null | RespCategoryArticlesList,
	ActionType<typeof getArticles>
>(null)
	.handleAction(getArticles.success, (_state, action) => action.payload)
	.handleAction(
		[getArticles.request, getArticles.failure, getArticles.cancel],
		(_state, _action) => null
	);

const handleGetArticlesListFailure = createReducer<
	null | string,
	ActionType<typeof getArticles>
>(null)
	.handleAction(getArticles.failure, (_state, action) => action.payload)
	.handleAction(
		[getArticles.request, getArticles.success, getArticles.cancel],
		(_state, _action) => null
	);

const handleGetArticlesListCancel = createReducer<
	null,
	ActionType<typeof getArticles>
>(null)
	.handleAction(getArticles.cancel, (_state, _action) => null)
	.handleAction(
		[getArticles.request, getArticles.success, getArticles.failure],
		(_state, _action) => null
	);

const listReducer = combineReducers({
	request: handleGetArticlesListRequest,
	success: handleGetArticlesListSuccess,
	failure: handleGetArticlesListFailure,
	cancel: handleGetArticlesListCancel,
});

const mainReducer = combineReducers({
	list: listReducer,
});

export default mainReducer;
