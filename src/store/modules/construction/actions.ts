import { Construction } from '~/models/construction.model';
import {
  ConstructionTypes,
  GetConstructionListRequestAction,
  GetConstructionListSuccessAction,
  GetConstructionListFailureAction,
  GetConstructionListAllRequestAction,
} from '~/store/types/construction.types';

export function getConstructionListRequest(): GetConstructionListRequestAction {
  return {
    type: ConstructionTypes.GET_CONSTRUCTION_LIST_REQUEST,
  };
}

export function getConstructionListSuccess(
  payload: Array<Construction>,
): GetConstructionListSuccessAction {
  return {
    type: ConstructionTypes.GET_CONSTRUCTION_LIST_SUCCESS,
    payload,
  };
}

export function getConstructionListFailure(): GetConstructionListFailureAction {
  return {
    type: ConstructionTypes.GET_CONSTRUCTION_LIST_FAILURE,
  };
}

export function getConstructionListAllRequest(): GetConstructionListAllRequestAction {
  return {
    type: ConstructionTypes.GET_CONSTRUCTION_LIST_ALL_REQUEST,
  };
}
