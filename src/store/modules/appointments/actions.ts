import {
  AppointmentActionTypes,
  GetAppointmentListRequestAction,
  GetAppointmentListSuccessAction,
  GetAppointmentListFailureAction,
  GetAppointmentListAllRequestAction,
} from '~/store/types/appointments.types';
import { Appointment } from '~/models/appointment.model';

export function getAppointmentListRequest(): GetAppointmentListRequestAction {
  return {
    type: AppointmentActionTypes.GET_APPOINTMENT_LIST_REQUEST,
  };
}

export function getAppointmentListSuccess(
  payload: Array<Appointment>,
): GetAppointmentListSuccessAction {
  return {
    type: AppointmentActionTypes.GET_APPOINTMENT_LIST_SUCCESS,
    payload,
  };
}

export function getAppointmentListFailure(): GetAppointmentListFailureAction {
  return {
    type: AppointmentActionTypes.GET_APPOINTMENT_LIST_FAILURE,
  };
}

export function getAppointmentListAllRequest(): GetAppointmentListAllRequestAction {
  return {
    type: AppointmentActionTypes.GET_APPOINTMENT_LIST_ALL_REQUEST,
  };
}
