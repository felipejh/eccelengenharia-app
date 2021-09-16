import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { AxiosResponse } from 'axios';
import api from '~/services/api';
import {
  getOccurrenceListRequest,
  getOccurrenceListSuccess,
  getOccurrenceListFailure,
} from '~/store/modules/occurrences/actions';
import { OccurrencesActionTypes } from '~/store/types/occurrences.types';
import { Occurrence } from '~/models/occurrences.model';

export function* getOccurrences({
  payload,
}: ReturnType<typeof getOccurrenceListRequest>): any {
  try {
    const { plantaId, obraId } = payload;

    const ws = `/api/v1/ocorrencias/obra/${obraId}`;

    const response: AxiosResponse<Array<Occurrence>> = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as plantas');
      return yield put(getOccurrenceListFailure());
    }

    const data: Array<Occurrence> = yield all(
      response.data.filter(occurrence => occurrence.plantaId === plantaId),
    );

    return yield put(getOccurrenceListSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getOccurrenceListFailure());
  }
}

export default all([
  takeLatest(
    OccurrencesActionTypes.GET_OCCURRENCE_LIST_REQUEST,
    getOccurrences,
  ),
]);
