import { Occurrence } from '~/models/occurrences.model';

export enum OccurrencesActionTypes {
  GET_OCCURRENCE_LIST_REQUEST = '@occurrence/GET_OCCURRENCE_LIST_REQUEST',
  GET_OCCURRENCE_LIST_SUCCESS = '@occurrence/GET_OCCURRENCE_LIST_SUCCESS',
  GET_OCCURRENCE_LIST_FAILURE = '@occurrence/GET_OCCURRENCE_LIST_FAILURE',
  GET_OCCURRENCE_LIST_ALL_REQUEST = '@occurrence/GET_OCCURRENCE_LIST_ALL_REQUEST',
}

export interface GetOccurrenceListRequestAction {
  type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_REQUEST;
  payload: Pick<Occurrence, 'plantaId' | 'obraId'>;
}

export interface GetOccurrenceListSuccessAction {
  type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_SUCCESS;
  payload: Array<Occurrence>;
}

export interface GetOccurrenceListFailureAction {
  type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_FAILURE;
}

export interface GetOccurrenceListAllRequestAction {
  type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_ALL_REQUEST;
}

export type OccurrenceActionProps =
  | GetOccurrenceListRequestAction
  | GetOccurrenceListSuccessAction
  | GetOccurrenceListFailureAction
  | GetOccurrenceListAllRequestAction;
