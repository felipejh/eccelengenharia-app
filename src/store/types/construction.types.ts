import { Construction } from '~/models/construction.model';

export enum ConstructionTypes {
  GET_CONSTRUCTION_LIST_REQUEST = '@construction/GET_CONSTRUCTION_LIST_REQUEST',
  GET_CONSTRUCTION_LIST_SUCCESS = '@construction/GET_CONSTRUCTION_LIST_SUCCESS',
  GET_CONSTRUCTION_LIST_FAILURE = '@construction/GET_CONSTRUCTION_LIST_FAILURE',
  GET_CONSTRUCTION_LIST_ALL_REQUEST = '@construction/GET_CONSTRUCTION_LIST_ALL_REQUEST',
}

export interface GetConstructionListRequestAction {
  type: ConstructionTypes.GET_CONSTRUCTION_LIST_REQUEST;
}

export interface GetConstructionListSuccessAction {
  type: ConstructionTypes.GET_CONSTRUCTION_LIST_SUCCESS;
  payload: Array<Construction>;
}

export interface GetConstructionListFailureAction {
  type: ConstructionTypes.GET_CONSTRUCTION_LIST_FAILURE;
}

export interface GetConstructionListAllRequestAction {
  type: ConstructionTypes.GET_CONSTRUCTION_LIST_ALL_REQUEST;
}

export type ConstructionActionProps =
  | GetConstructionListRequestAction
  | GetConstructionListSuccessAction
  | GetConstructionListFailureAction
  | GetConstructionListAllRequestAction;
