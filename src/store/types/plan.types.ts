import { Plan } from '~/models/plans.model';

export enum PlanActionTypes {
  GET_PLAN_LIST_REQUEST = '@plan/GET_PLAN_LIST_REQUEST',
  GET_PLAN_LIST_SUCCESS = '@plan/GET_PLAN_LIST_SUCCESS',
  GET_PLAN_LIST_FAILURE = '@plan/GET_PLAN_LIST_FAILURE',
  GET_PLAN_LIST_ALL_REQUEST = '@plan/GET_PLAN_LIST_ALL_REQUEST',
}

export interface GetPlanListRequestAction {
  type: PlanActionTypes.GET_PLAN_LIST_REQUEST;
  payload: {
    constructionId: number;
  };
}

export interface GetPlanListSuccessAction {
  type: PlanActionTypes.GET_PLAN_LIST_SUCCESS;
  payload: Array<Plan>;
}

export interface GetPlanListFailureAction {
  type: PlanActionTypes.GET_PLAN_LIST_FAILURE;
}

export interface GetPlanListAllRequestAction {
  type: PlanActionTypes.GET_PLAN_LIST_ALL_REQUEST;
}

export type PlanActionProps =
  | GetPlanListRequestAction
  | GetPlanListSuccessAction
  | GetPlanListFailureAction
  | GetPlanListAllRequestAction;
