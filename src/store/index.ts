import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { createStore } from 'redux-dynamic-modules-core';

const saga = getSagaExtension({});

export const store = createStore({
	initialState: {},
	advancedComposeEnhancers: composeWithDevTools({
		trace: true,
		traceLimit: 10,
	}),
	extensions: [saga],
});
