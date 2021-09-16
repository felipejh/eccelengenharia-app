import { all as allSaga } from 'redux-saga/effects';

import all from '~/store/modules/all/sagas';
import auth from '~/store/modules/auth/sagas';
import construction from '~/store/modules/construction/sagas';
import plan from '~/store/modules/plan/sagas';
import groups from '~/store/modules/groups/sagas';

export default function* rootSaga(): any {
  return yield allSaga([all, auth, construction, plan, groups]);
}
