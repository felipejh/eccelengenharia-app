import { combineReducers } from 'redux';

import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';

export const rootReducer = combineReducers({
  auth,
  construction,
});

export type RootState = ReturnType<typeof rootReducer>;
