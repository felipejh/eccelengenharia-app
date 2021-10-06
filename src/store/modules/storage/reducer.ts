import produce from 'immer';
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
  action: StorageActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case StorageActionTypes.SET_LAST_SYNC_DATE: {
        draft.lastSyncDate = action.payload;
        break;
      }
      default:
        break;
    }
  });
}
