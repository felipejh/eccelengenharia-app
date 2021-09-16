import { produce } from 'immer';
import { Group } from '~/models/groups.model';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';
import {
  GroupActionProps,
  GroupsActionTypes,
} from '~/store/types/groups.types';

interface StateProps {
  loading: boolean;
  listGroups: Array<Group>;
}

const INITIAL_STATE: StateProps = {
  loading: false,
  listGroups: [],
};

export default function groups(
  state = INITIAL_STATE,
  action: GroupActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case GroupsActionTypes.GET_GROUP_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case GroupsActionTypes.GET_GROUP_LIST_SUCCESS: {
        draft.listGroups = action.payload;
        draft.loading = false;
        break;
      }
      case GroupsActionTypes.GET_GROUP_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      case GroupsActionTypes.GET_GROUP_LIST_ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.listGroups = [];
        draft.loading = false;
        break;
      }
      default:
        break;
    }
  });
}
