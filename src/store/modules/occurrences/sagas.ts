import { all, spawn, takeEvery } from 'redux-saga/effects';

import { startWatchingNetworkConnectivity } from '~/services/offline';
import { addOccurrence } from '~/services/occurrencesServices';

import { OccurrencesTypes } from '~/store/types/occurrences.types';

export default all([
  spawn(startWatchingNetworkConnectivity),
  takeEvery(OccurrencesTypes.ADD_OCCURRENCE_REQUEST, addOccurrence),
]);
