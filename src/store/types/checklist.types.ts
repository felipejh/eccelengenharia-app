import { Checklist } from '~/models/checklist.model';

export enum ChecklistActionTypes {
  GET_CHECKLIST_LIST_REQUEST = '@checklist/GET_CHECKLIST_LIST_REQUEST',
  GET_CHECKLIST_LIST_SUCCESS = '@checklist/GET_CHECKLIST_LIST_SUCCESS',
  GET_CHECKLIST_LIST_FAILURE = '@checklist/GET_CHECKLIST_LIST_FAILURE',
  GET_CHECKLIST_LIST_ALL_REQUEST = '@checklist/GET_CHECKLIST_LIST_ALL_REQUEST',
}

export interface GetChecklistListRequestAction {
  type: ChecklistActionTypes.GET_CHECKLIST_LIST_REQUEST;
}

export interface GetChecklistListSuccessAction {
  type: ChecklistActionTypes.GET_CHECKLIST_LIST_SUCCESS;
  payload: Array<Checklist>;
}

export interface GetChecklistListFailureAction {
  type: ChecklistActionTypes.GET_CHECKLIST_LIST_FAILURE;
}

export interface GetChecklistListAllRequestAction {
  type: ChecklistActionTypes.GET_CHECKLIST_LIST_ALL_REQUEST;
}

export type ChecklistActionProps =
  | GetChecklistListRequestAction
  | GetChecklistListSuccessAction
  | GetChecklistListFailureAction
  | GetChecklistListAllRequestAction;
