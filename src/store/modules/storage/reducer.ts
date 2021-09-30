import produce from 'immer';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';
import {
  StorageActionProps,
  StorageActionTypes,
} from '~/store/types/storage.types';

type StateProps = {
  lastSyncDate: string | undefined;
};

const INITIAL_STATE: StateProps = {
  lastSyncDate: undefined,
};

export default function storage(
  state = INITIAL_STATE,
  action: StorageActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case StorageActionTypes.SET_LAST_SYNC_DATE: {
        draft.lastSyncDate = action.payload;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.lastSyncDate = undefined;
        break;
      }
      default:
        break;
    }
  });
}
