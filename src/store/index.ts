import { persistStore, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware,
} from 'redux-offline-queue';

import createStore from './createStore';
import persistReducers from './persistReducers';

import { rootReducer } from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [];

middlewares.push(offlineMiddleware({ additionalTriggers: REHYDRATE }));
middlewares.push(suspendSaga(sagaMiddleware));
middlewares.push(consumeActionMiddleware());

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
