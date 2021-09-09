import { produce } from 'immer';
import { AllTypes, AllActionsProps } from '~/store/types/all.types';

interface StateProps {
  loading: boolean;
}

const INITIAL_STATE: StateProps = {
  loading: false,
};

export default function all(
  state = INITIAL_STATE,
  action: AllActionsProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case AllTypes.ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AllTypes.ALL_SUCCESS: {
        draft.loading = false;
        break;
      }
      case AllTypes.ALL_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
