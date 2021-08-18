import { Task } from 'redux-saga';
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getArticle, getArticles } from 'src/ducks/article/actions';
import { RespArticle, RespArticlesList } from 'src/ducks/article/types';
import { Article } from 'src/api/article';

function* syncGetArticlesListRequest(
	action: ReturnType<typeof getArticles.request>
) {
	try {
		const data: RespArticlesList = yield call(Article.List, action.payload);
		yield put(getArticles.success(data));
	} catch (err) {
		yield put(getArticles.failure(err));
	}
}

function* handleGetArticlesListRequest(
	action: ReturnType<typeof getArticles.request>
) {
	try {
		const task: Task = yield fork(syncGetArticlesListRequest, action);
		yield take(getArticles.cancel);
		yield cancel(task);
	} catch (err) {
		if (process.env.NODE_ENV === 'development') {
			console.error(err);
		}
	}
}

function* syncGetArticleRequest(action: ReturnType<typeof getArticle.request>) {
	try {
		const data: RespArticle = yield call(Article.Get, action.payload);
		yield put(getArticle.success(data));
	} catch (err) {
		yield put(getArticle.failure(err));
	}
}

function* handleGetArticleRequest(
	action: ReturnType<typeof getArticle.request>
) {
	try {
		const task: Task = yield fork(syncGetArticleRequest, action);
		yield take(getArticle.cancel);
		yield cancel(task);
	} catch (err) {
		if (process.env.NODE_ENV === 'development') {
			console.error(err);
		}
	}
}

export default function* main() {
	yield takeLatest(getArticles.request, handleGetArticlesListRequest);
	yield takeLatest(getArticle.request, handleGetArticleRequest);
}
