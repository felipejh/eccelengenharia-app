import produce from 'immer';
import { Construction } from '~/models/construction.model';
import {
  ConstructionTypes,
  ConstructionActionProps,
} from '~/store/types/construction.types';

interface StateProps {
  loading: boolean;
  listConstruction: Array<Construction>;
}

const INITIAL_STATE: StateProps = {
  listConstruction: [],
  loading: false,
};

export default function construction(
  state = INITIAL_STATE,
  action: ConstructionActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case ConstructionTypes.GET_CONSTRUCTION_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case ConstructionTypes.GET_CONSTRUCTION_LIST_SUCCESS: {
        draft.listConstruction = action.payload;
        draft.loading = false;
        break;
      }
      case ConstructionTypes.GET_CONSTRUCTION_LIST_FAILURE: {
        draft.loading = false;
        draft.listConstruction = [];
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.listConstruction = [];
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
