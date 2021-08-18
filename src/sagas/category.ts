import { Task } from 'redux-saga';
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { getArticles } from 'src/ducks/category/actions';
import { Category } from 'src/api/category';
import { RespCategoryArticlesList } from 'src/ducks/category/types';

function* syncGetArticlesListRequest(
	action: ReturnType<typeof getArticles.request>
) {
	try {
		const data: RespCategoryArticlesList = yield call(
			Category.List,
			action.payload
		);
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

export default function* main() {
	yield takeLatest(getArticles.request, handleGetArticlesListRequest);
}
