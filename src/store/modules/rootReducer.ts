import { combineReducers } from 'redux';

import all from '~/store/modules/all/reducer';
import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';
import plan from '~/store/modules/plan/reducer';

export const rootReducer = combineReducers({
  all,
  auth,
  construction,
  plan,
});

export type RootState = ReturnType<typeof rootReducer>;
