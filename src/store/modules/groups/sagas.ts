import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import { Group } from '~/models/groups.model';
import { GroupsActionTypes } from '~/store/types/groups.types';
import api from '~/services/api';
import { getGroupListFailure, getGroupListSuccess } from './actions';

export function* getGroups(): any {
  try {
    const ws = '/api/v1/grupos';

    const response: AxiosResponse<Array<Group>> = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as plantas');
      return yield put(getGroupListFailure());
    }

    return yield put(getGroupListSuccess(response.data));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getGroupListFailure());
  }
}

export default all([
  takeLatest(GroupsActionTypes.GET_GROUP_LIST_REQUEST, getGroups),
]);
