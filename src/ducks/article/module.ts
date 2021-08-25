import { ISagaModule } from 'redux-dynamic-modules-saga';

import { listArticlesSaga, itemArticleSaga } from 'src/sagas/article';
import { listArticlesReducer, itemArticleReducer } from './reducer';

export interface IListArticlesAwareState {
	listArticles: IListArticlesState;
}

export interface IListArticlesState
	extends ReturnType<typeof listArticlesReducer> {}

export const listArticlesModule = (): ISagaModule<IListArticlesAwareState> => {
	return {
		id: 'listArticles',
		reducerMap: {
			listArticles: listArticlesReducer,
		},
		sagas: [listArticlesSaga],
	};
};

export interface IItemArticleAwareState {
	itemArticle: IItemArticleState;
}

export interface IItemArticleState
	extends ReturnType<typeof itemArticleReducer> {}

export const itemArticleModule = (): ISagaModule<IItemArticleAwareState> => {
	return {
		id: 'itemArticle',
		reducerMap: {
			itemArticle: itemArticleReducer,
		},
		sagas: [itemArticleSaga],
	};
};
