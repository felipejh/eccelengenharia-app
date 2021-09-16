import { Occurrence } from '~/models/occurrences.model';
import {
  GetOccurrenceListAllRequestAction,
  GetOccurrenceListFailureAction,
  GetOccurrenceListRequestAction,
  GetOccurrenceListSuccessAction,
  OccurrencesActionTypes,
} from '~/store/types/occurrences.types';

export function getOccurrenceListRequest(
  payload: Pick<Occurrence, 'plantaId' | 'obraId'>,
): GetOccurrenceListRequestAction {
  return {
    type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_REQUEST,
    payload,
  };
}

export function getOccurrenceListSuccess(
  payload: Array<Occurrence>,
): GetOccurrenceListSuccessAction {
  return {
    type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_SUCCESS,
    payload,
  };
}

export function getOccurrenceListFailure(): GetOccurrenceListFailureAction {
  return {
    type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_FAILURE,
  };
}

export function getOccurrenceListAllRequest(): GetOccurrenceListAllRequestAction {
  return {
    type: OccurrencesActionTypes.GET_OCCURRENCE_LIST_ALL_REQUEST,
  };
}
