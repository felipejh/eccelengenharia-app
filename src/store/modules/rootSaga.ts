import { all as allSaga } from 'redux-saga/effects';

import auth from '~/store/modules/auth/sagas';
import occurrences from '~/store/modules/occurrences/sagas';

export default function* rootSaga(): any {
  return yield allSaga([auth, occurrences]);
}
