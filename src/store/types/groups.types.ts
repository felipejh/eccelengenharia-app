import { Group } from '~/models/groups.model';

export enum GroupsActionTypes {
  GET_GROUP_LIST_REQUEST = '@group/GET_GROUP_LIST_REQUEST',
  GET_GROUP_LIST_SUCCESS = '@group/GET_GROUP_LIST_SUCCESS',
  GET_GROUP_LIST_FAILURE = '@group/GET_GROUP_LIST_FAILURE',
  GET_GROUP_LIST_ALL_REQUEST = '@group/GET_GROUP_LIST_ALL_REQUEST',
}

export interface GetGroupListRequestAction {
  type: GroupsActionTypes.GET_GROUP_LIST_REQUEST;
}

export interface GetGroupListSuccessAction {
  type: GroupsActionTypes.GET_GROUP_LIST_SUCCESS;
  payload: Array<Group>;
}

export interface GetGroupListFailureAction {
  type: GroupsActionTypes.GET_GROUP_LIST_FAILURE;
}

export interface GetGroupListAllRequestAction {
  type: GroupsActionTypes.GET_GROUP_LIST_ALL_REQUEST;
}

export type GroupActionProps =
  | GetGroupListRequestAction
  | GetGroupListSuccessAction
  | GetGroupListFailureAction
  | GetGroupListAllRequestAction;
