import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { AxiosResponse } from 'axios';
import { AppointmentActionTypes } from '~/store/types/appointments.types';
import {
  getAppointmentListFailure,
  getAppointmentListSuccess,
} from '~/store/modules/appointments/actions';
import { Appointment } from '~/models/appointment.model';
import api from '~/services/api';

export function* getAppointments(): any {
  try {
    const ws = '/api/v1/apontamentos?eager=true';

    const response: AxiosResponse<Array<Appointment>> = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as plantas');
      return yield put(getAppointmentListFailure());
    }

    return yield put(getAppointmentListSuccess(response.data));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getAppointmentListFailure());
  }
}

export default all([
  takeLatest(
    AppointmentActionTypes.GET_APPOINTMENT_LIST_REQUEST,
    getAppointments,
  ),
]);
