import { combineReducers } from 'redux';

import all from '~/store/modules/all/reducer';
import auth from '~/store/modules/auth/reducer';
import construction from '~/store/modules/construction/reducer';
import plan from '~/store/modules/plan/reducer';
import groups from '~/store/modules/groups/reducer';
import appointments from '~/store/modules/appointments/reducer';
import occurrences from '~/store/modules/occurrences/reducer';
import checklists from '~/store/modules/checklists/reducer';
import storage from '~/store/modules/storage/reducer';

export const rootReducer = combineReducers({
  all,
  auth,
  construction,
  plan,
  groups,
  appointments,
  occurrences,
  checklists,
  storage,
});

export type RootState = ReturnType<typeof rootReducer>;
