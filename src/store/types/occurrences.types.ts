import { Occurrence } from '~/models/occurrences.model';

export enum OccurrencesTypes {
  ADD_OCCURRENCE_REQUEST = '@occurrences/ADD_OCCURRENCE_REQUEST',
  ADD_OCCURRENCE_SUCCESS = '@occurrences/ADD_OCCURRENCE_SUCCESS',
  ADD_OCCURRENCE_FAILURE = '@occurrences/ADD_OCCURRENCE_FAILURE',
}

export interface AddOccurrenceRequestProps {
  coordX: number;
  coordY: number;
  constructionId: number;
  planId: number;
  userId: number;
  userCreateId: number;
  userUpdateId?: number;
  appointmentId: number | undefined | null;
}

export interface AddOccurrenceSuccessProps {
  occurrence: Occurrence;
}

export interface AddOccurrenceRequestAction {
  type: OccurrencesTypes.ADD_OCCURRENCE_REQUEST;
  payload: AddOccurrenceRequestProps;
}

export interface AddOccurrenceSuccessAction {
  type: OccurrencesTypes.ADD_OCCURRENCE_SUCCESS;
  payload: AddOccurrenceRequestProps;
}

export interface AddOccurrenceFailureAction {
  type: OccurrencesTypes.ADD_OCCURRENCE_FAILURE;
}

export type OccurrencesActionProps =
  | AddOccurrenceRequestAction
  | AddOccurrenceSuccessAction
  | AddOccurrenceFailureAction;
