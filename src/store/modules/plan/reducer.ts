import { produce } from 'immer';
import { Plan } from '~/models/plans.model';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';
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
  action: PlanActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case PlanActionTypes.GET_PLAN_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case PlanActionTypes.GET_PLAN_LIST_SUCCESS: {
        if (draft.listPlans.length > 0) {
          action.payload.forEach(p => {
            const findIndex = draft.listPlans.findIndex(l => l.id === p.id);
            if (findIndex) {
              draft.listPlans.splice(findIndex, 1, p);
            }
          });

          draft.loading = false;
          break;
        }

        draft.loading = false;
        draft.listPlans = action.payload;
        break;
      }
      case PlanActionTypes.GET_PLAN_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      case PlanActionTypes.GET_PLAN_LIST_ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.listPlans = [];
        draft.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
}
