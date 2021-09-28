export enum StorageActionTypes {
  SET_LAST_SYNC_DATE = '@storage/SET_LAST_SYNC_DATE',
}

export interface SetLastSyncDateAction {
  type: StorageActionTypes.SET_LAST_SYNC_DATE;
  payload: Date | undefined;
}

export type StorageActionProps = SetLastSyncDateAction;
