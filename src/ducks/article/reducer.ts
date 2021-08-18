import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';

import { getArticle, getArticles } from './actions';
import { RespArticle, RespArticlesList } from './types';

const handleGetArticlesListRequest = createReducer<
	null | number,
	ActionType<typeof getArticles>
>(null)
	.handleAction(getArticles.request, (_state, action) => action.payload)
	.handleAction(
		[getArticles.success, getArticles.failure, getArticles.cancel],
		(_state, _action) => null
	);

const handleGetArticlesListSuccess = createReducer<
	null | RespArticlesList,
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

const handleGetArticleRequest = createReducer<
	null | number,
	ActionType<typeof getArticle>
>(null)
	.handleAction(getArticle.request, (_state, action) => action.payload)
	.handleAction(
		[getArticle.success, getArticle.failure, getArticle.cancel],
		(_state, _action) => null
	);

const handleGetArticleSuccess = createReducer<
	null | RespArticle,
	ActionType<typeof getArticle>
>(null)
	.handleAction(getArticle.success, (_state, action) => action.payload)
	.handleAction(
		[getArticle.request, getArticle.failure, getArticle.cancel],
		(_state, _action) => null
	);

const handleGetArticleFailure = createReducer<
	null | string,
	ActionType<typeof getArticle>
>(null)
	.handleAction(getArticle.failure, (_state, action) => action.payload)
	.handleAction(
		[getArticle.request, getArticle.success, getArticle.cancel],
		(_state, _action) => null
	);

const handleGetArticleCancel = createReducer<
	null,
	ActionType<typeof getArticle>
>(null)
	.handleAction(getArticle.cancel, (_state, _action) => null)
	.handleAction(
		[getArticle.request, getArticle.success, getArticle.failure],
		(_state, _action) => null
	);

const itemReducer = combineReducers({
	request: handleGetArticleRequest,
	success: handleGetArticleSuccess,
	failure: handleGetArticleFailure,
	cancel: handleGetArticleCancel,
});

const mainReducer = combineReducers({
	list: listReducer,
	item: itemReducer,
});

export default mainReducer;
