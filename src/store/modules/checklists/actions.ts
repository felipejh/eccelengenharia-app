import { Checklist } from '~/models/checklist.model';
import {
  ChecklistActionTypes,
  GetChecklistListAllRequestAction,
  GetChecklistListFailureAction,
  GetChecklistListRequestAction,
  GetChecklistListSuccessAction,
} from '~/store/types/checklist.types';

export function getChecklistListRequest(): GetChecklistListRequestAction {
  return {
    type: ChecklistActionTypes.GET_CHECKLIST_LIST_REQUEST,
  };
}

export function getChecklistListSuccess(
  payload: Array<Checklist>,
): GetChecklistListSuccessAction {
  return {
    type: ChecklistActionTypes.GET_CHECKLIST_LIST_SUCCESS,
    payload,
  };
}

export function getChecklistListFailure(): GetChecklistListFailureAction {
  return {
    type: ChecklistActionTypes.GET_CHECKLIST_LIST_FAILURE,
  };
}

export function getChecklistListAllRequest(): GetChecklistListAllRequestAction {
  return {
    type: ChecklistActionTypes.GET_CHECKLIST_LIST_ALL_REQUEST,
  };
}
