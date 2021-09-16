import { Appointment } from '~/models/appointment.model';

export enum AppointmentActionTypes {
  GET_APPOINTMENT_LIST_REQUEST = '@appointments/GET_APPOINTMENT_LIST_REQUEST',
  GET_APPOINTMENT_LIST_SUCCESS = '@appointments/GET_APPOINTMENT_LIST_SUCCESS',
  GET_APPOINTMENT_LIST_FAILURE = '@appointments/GET_APPOINTMENT_LIST_FAILURE',
  GET_APPOINTMENT_LIST_ALL_REQUEST = '@appointments/GET_APPOINTMENT_LIST_ALL_REQUEST',
}

export interface GetAppointmentListRequestAction {
  type: AppointmentActionTypes.GET_APPOINTMENT_LIST_REQUEST;
}

export interface GetAppointmentListSuccessAction {
  type: AppointmentActionTypes.GET_APPOINTMENT_LIST_SUCCESS;
  payload: Array<Appointment>;
}

export interface GetAppointmentListFailureAction {
  type: AppointmentActionTypes.GET_APPOINTMENT_LIST_FAILURE;
}

export interface GetAppointmentListAllRequestAction {
  type: AppointmentActionTypes.GET_APPOINTMENT_LIST_ALL_REQUEST;
}

export type AppointmentActionProps =
  | GetAppointmentListRequestAction
  | GetAppointmentListSuccessAction
  | GetAppointmentListFailureAction
  | GetAppointmentListAllRequestAction;
