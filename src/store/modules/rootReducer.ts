import { combineReducers } from 'redux';

import all from '~/store/modules/all/reducer';
import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';
import plan from '~/store/modules/plan/reducer';
import groups from '~/store/modules/groups/reducer';
import appointments from '~/store/modules/appointments/reducer';
import occurrences from '~/store/modules/occurrences/reducer';

export const rootReducer = combineReducers({
  all,
  auth,
  construction,
  plan,
  groups,
  appointments,
  occurrences,
});

export type RootState = ReturnType<typeof rootReducer>;
