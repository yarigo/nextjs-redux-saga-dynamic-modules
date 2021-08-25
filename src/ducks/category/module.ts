import { ISagaModule } from 'redux-dynamic-modules-saga';

import { listArticlesSaga } from 'src/sagas/category';
import { listArticlesReducer } from './reducer';

export interface IListArticlesAwareState {
	listCategoryArticles: IListArticlesState;
}

export interface IListArticlesState
	extends ReturnType<typeof listArticlesReducer> {}

export const listCategoryArticlesModule =
	(): ISagaModule<IListArticlesAwareState> => {
		return {
			id: 'listCategoryArticles',
			reducerMap: {
				listCategoryArticles: listArticlesReducer,
			},
			sagas: [listArticlesSaga],
		};
	};
