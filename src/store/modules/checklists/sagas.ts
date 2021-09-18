import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { AxiosResponse } from 'axios';
import api from '~/services/api';
import { ChecklistActionTypes } from '~/store/types/checklist.types';
import { Checklist } from '~/models/checklist.model';
import {
  getChecklistListFailure,
  getChecklistListSuccess,
} from '~/store/modules/checklists/actions';

export function* getChecklists(): any {
  try {
    const ws = '/api/v1/checklists';

    const response: AxiosResponse<Array<Checklist>> = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as plantas');
      return yield put(getChecklistListFailure());
    }

    const data = response.data.filter(checklist => checklist.ativo === 1);

    return yield put(getChecklistListSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getChecklistListFailure());
  }
}

export default all([
  takeLatest(ChecklistActionTypes.GET_CHECKLIST_LIST_REQUEST, getChecklists),
]);
