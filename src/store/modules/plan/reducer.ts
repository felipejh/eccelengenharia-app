import { produce } from 'immer';
import { Plan } from '~/models/plans.model';
import { PlanActionProps, PlanActionTypes } from '~/store/types/plan.types';

interface StateProps {
  loading: boolean;
  listPlans: Array<Plan>;
}

const INITIAL_STATE: StateProps = {
  loading: false,
  listPlans: [],
};

export default function plan(
  state = INITIAL_STATE,
  action: PlanActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case PlanActionTypes.GET_PLAN_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case PlanActionTypes.GET_PLAN_LIST_SUCCESS: {
        draft.loading = false;
        draft.listPlans = action.payload;
        break;
      }
      case PlanActionTypes.GET_PLAN_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
}
