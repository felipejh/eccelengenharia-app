import { combineReducers } from 'redux';

import all from '~/store/modules/all/reducer';
import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';

export const rootReducer = combineReducers({
  all,
  auth,
  construction,
});

export type RootState = ReturnType<typeof rootReducer>;
