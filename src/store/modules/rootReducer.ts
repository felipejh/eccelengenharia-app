import { combineReducers } from 'redux';

import auth from '~/store/modules/auth/reducer';

import storage from '~/store/modules/storage/reducer';

import offlineQueue from '~/store/modules/offlineQueue/reducer';

export const rootReducer = combineReducers({
  auth,
  storage,
  offlineQueue,
});

export type RootState = ReturnType<typeof rootReducer>;
