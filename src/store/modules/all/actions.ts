import {
  AllTypes,
  AllRequestAction,
  AllSuccessAction,
  AllFailureAction,
} from '~/store/types/all.types';

export function allRequest(): AllRequestAction {
  return {
    type: AllTypes.ALL_REQUEST,
  };
}

export function allSuccess(): AllSuccessAction {
  return {
    type: AllTypes.ALL_SUCCESS,
  };
}

export function allFailure(): AllFailureAction {
  return {
    type: AllTypes.ALL_FAILURE,
  };
}
