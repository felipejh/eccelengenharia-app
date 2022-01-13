import { combineReducers } from 'redux';

import auth from '~/store/modules/auth/reducer';

import storage from '~/store/modules/storage/reducer';

export const rootReducer = combineReducers({
  auth,
  storage,
});

export type RootState = ReturnType<typeof rootReducer>;
