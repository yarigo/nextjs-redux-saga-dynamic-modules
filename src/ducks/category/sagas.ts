import { Task } from 'redux-saga';
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { category } from 'src/api/category';
import { ICategory } from 'src/api/category/interface';

import { CategoryActions } from './reducers';

function* syncGetArticlesList(
  action: ReturnType<typeof CategoryActions.categoryRequest>
) {
  try {
    const data: ReturnPromiseType<ICategory['List']> = yield call(
      category.List,
      action.payload
    );
    yield put(CategoryActions.categorySuccess(data));
  } catch (err) {
    console.error(err);
    yield put(CategoryActions.categoryFailure());
  }
}

function* handleGetArticlesList(
  action: ReturnType<typeof CategoryActions.categoryRequest>
) {
  const task: Task = yield fork(syncGetArticlesList, action);
  yield take(CategoryActions.categoryAbort);
  yield cancel(task);
}

export const categorySaga = function* main() {
  yield takeLatest(CategoryActions.categoryRequest, handleGetArticlesList);
};
