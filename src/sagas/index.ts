import { fork } from 'redux-saga/effects';

import article from './article';
import category from './category';

export default function* saga() {
	yield fork(article);
	yield fork(category);
}
