import produce from 'immer';
import {
  EnqueueChecklistProps,
  EnqueueOccurrenceProps,
  OfflineQueueActionProps,
  OfflineQueueTypes,
} from '~/store/types/offlineQueue';

type StateProps = {
  listOccurrence: Array<EnqueueOccurrenceProps>;
  listChecklist: Array<EnqueueChecklistProps>;
};

const INITIAL_STATE: StateProps = {
  listOccurrence: [],
  listChecklist: [],
};

export default function offlineQueue(
  state = INITIAL_STATE,
  action: OfflineQueueActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case OfflineQueueTypes.ENQUEUE_OCCURRENCE: {
        draft.listOccurrence.push(action.payload);
        break;
      }
      case OfflineQueueTypes.DEQUEUE_OCCURRENCE: {
        const index = draft.listOccurrence.findIndex(
          i => i.id === action.payload.id,
        );

        draft.listOccurrence.splice(index, 1);

        break;
      }
      case OfflineQueueTypes.ENQUEUE_CHECKLIST: {
        draft.listChecklist.push(action.payload);
        break;
      }
      case OfflineQueueTypes.DEQUEUE_CHECKLIST: {
        const index = draft.listChecklist.findIndex(
          i => i.id === action.payload.id,
        );

        draft.listChecklist.splice(index, 1);

        break;
      }
      default:
    }
  });
}
