import { combineReducers } from 'redux';
import ReduxOfflineQueue from 'redux-offline-queue';

import auth from '~/store/modules/auth/reducer';

import storage from '~/store/modules/storage/reducer';

export const rootReducer = combineReducers({
  auth,
  storage,
  offline: ReduxOfflineQueue.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
