import { Plan } from '~/models/plans.model';
import {
  GetPlanListFailureAction,
  GetPlanListRequestAction,
  GetPlanListSuccessAction,
  PlanActionTypes,
} from '~/store/types/plan.types';

export function getPlanListRequest(
  constructionId: number,
): GetPlanListRequestAction {
  return {
    type: PlanActionTypes.GET_PLAN_LIST_REQUEST,
    payload: {
      constructionId,
    },
  };
}

export function getPlanListSuccess(
  payload: Array<Plan>,
): GetPlanListSuccessAction {
  return {
    type: PlanActionTypes.GET_PLAN_LIST_SUCCESS,
    payload,
  };
}

export function getPlanListFailure(): GetPlanListFailureAction {
  return {
    type: PlanActionTypes.GET_PLAN_LIST_FAILURE,
  };
}
