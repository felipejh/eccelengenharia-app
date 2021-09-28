import {
  SetLastSyncDateAction,
  StorageActionTypes,
} from '~/store/types/storage.types';

export function setLastSyncDate(
  payload: Date | undefined,
): SetLastSyncDateAction {
  return {
    type: StorageActionTypes.SET_LAST_SYNC_DATE,
    payload,
  };
}
