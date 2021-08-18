import { createStore, applyMiddleware } from 'redux';
import { StateType } from 'typesafe-actions';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import rootSaga from 'src/sagas';

export type RootState = StateType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware<RootState>();

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 10,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
