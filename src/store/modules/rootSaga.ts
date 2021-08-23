import { all } from 'redux-saga/effects';

import auth from '~/store/modules/auth/sagas';
import construction from '~/store/modules/construction/sagas';

export default function* rootSaga(): any {
  return yield all([auth, construction]);
}
