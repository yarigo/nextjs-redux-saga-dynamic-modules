import { Task } from 'redux-saga';
import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects';

import { article } from 'src/api/article';
import { IArticle } from 'src/api/article/interface';

import { ArticleActions } from './reducers';

function* syncGetArticlesList(
  action: ReturnType<typeof ArticleActions.articlesRequest>
) {
  try {
    const data: ReturnPromiseType<IArticle['List']> = yield call(
      article.List,
      action.payload
    );
    yield put(ArticleActions.articlesSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(ArticleActions.articlesFailure());
  }
}

function* handleGetArticlesList(
  action: ReturnType<typeof ArticleActions.articlesRequest>
) {
  const task: Task = yield fork(syncGetArticlesList, action);
  yield take(ArticleActions.articlesAbort);
  yield cancel(task);
}

function* syncGetArticle(
  action: ReturnType<typeof ArticleActions.articleRequest>
) {
  try {
    const data: ReturnPromiseType<IArticle['Get']> = yield call(
      article.Get,
      action.payload
    );
    yield put(ArticleActions.articleSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(ArticleActions.articleFailure());
  }
}

function* handleGetArticle(
  action: ReturnType<typeof ArticleActions.articleRequest>
) {
  const task: Task = yield fork(syncGetArticle, action);
  yield take(ArticleActions.articleAbort);
  yield cancel(task);
}

export const articleSaga = function* main() {
  yield takeLatest(ArticleActions.articlesRequest, handleGetArticlesList);
  yield takeLatest(ArticleActions.articleRequest, handleGetArticle);
};
