import { Group } from '~/models/groups.model';
import {
  GetGroupListRequestAction,
  GroupsActionTypes,
  GetGroupListSuccessAction,
  GetGroupListFailureAction,
  GetGroupListAllRequestAction,
} from '~/store/types/groups.types';

export function getGroupListRequest(): GetGroupListRequestAction {
  return {
    type: GroupsActionTypes.GET_GROUP_LIST_REQUEST,
  };
}

export function getGroupListSuccess(
  payload: Array<Group>,
): GetGroupListSuccessAction {
  return {
    type: GroupsActionTypes.GET_GROUP_LIST_SUCCESS,
    payload,
  };
}

export function getGroupListFailure(): GetGroupListFailureAction {
  return {
    type: GroupsActionTypes.GET_GROUP_LIST_FAILURE,
  };
}

export function getGroupListAllRequest(): GetGroupListAllRequestAction {
  return {
    type: GroupsActionTypes.GET_GROUP_LIST_ALL_REQUEST,
  };
}
