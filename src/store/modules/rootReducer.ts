import { combineReducers } from 'redux';

import all from '~/store/modules/all/reducer';
import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';
import plan from '~/store/modules/plan/reducer';
import groups from '~/store/modules/groups/reducer';
import appointments from '~/store/modules/appointments/reducer';

export const rootReducer = combineReducers({
  all,
  auth,
  construction,
  plan,
  groups,
  appointments,
});

export type RootState = ReturnType<typeof rootReducer>;
