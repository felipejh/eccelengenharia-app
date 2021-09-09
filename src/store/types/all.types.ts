export enum AllTypes {
  ALL_REQUEST = '@all/ALL_REQUEST',
  ALL_SUCCESS = '@all/ALL_SUCCESS',
  ALL_FAILURE = '@all/ALL_FAILURE',
}

export interface AllRequestAction {
  type: AllTypes.ALL_REQUEST;
}

export interface AllSuccessAction {
  type: AllTypes.ALL_SUCCESS;
}

export interface AllFailureAction {
  type: AllTypes.ALL_FAILURE;
}

export type AllActionsProps =
  | AllRequestAction
  | AllSuccessAction
  | AllFailureAction;
