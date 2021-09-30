import { all as allSaga } from 'redux-saga/effects';

import auth from '~/store/modules/auth/sagas';

export default function* rootSaga(): any {
  return yield allSaga([auth]);
}
