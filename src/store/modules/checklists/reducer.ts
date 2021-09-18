import { produce } from 'immer';
import { Checklist } from '~/models/checklist.model';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';
import {
  ChecklistActionProps,
  ChecklistActionTypes,
} from '~/store/types/checklist.types';

interface StateProps {
  loading: boolean;
  listChecklists: Array<Checklist>;
}

const INITIAL_STATE: StateProps = {
  loading: false,
  listChecklists: [],
};

export default function checklists(
  state = INITIAL_STATE,
  action: ChecklistActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case ChecklistActionTypes.GET_CHECKLIST_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case ChecklistActionTypes.GET_CHECKLIST_LIST_SUCCESS: {
        draft.listChecklists = action.payload;
        draft.loading = false;
        break;
      }
      case ChecklistActionTypes.GET_CHECKLIST_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      case ChecklistActionTypes.GET_CHECKLIST_LIST_ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.listChecklists = [];
        draft.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
}
