import {
  DequeueChecklistAction,
  DequeueChecklistProps,
  DequeueOccurrenceAction,
  DequeueOccurrenceProps,
  EnqueueChecklistAction,
  EnqueueChecklistProps,
  EnqueueOccurrenceAction,
  EnqueueOccurrenceProps,
  OfflineQueueTypes,
} from '~/store/types/offlineQueue';

export function enqueueOccurrence({
  id,
  object,
}: EnqueueOccurrenceProps): EnqueueOccurrenceAction {
  return {
    type: OfflineQueueTypes.ENQUEUE_OCCURRENCE,
    payload: { id, object },
  };
}

export function dequeueOccurrence({
  id,
}: DequeueOccurrenceProps): DequeueOccurrenceAction {
  return {
    type: OfflineQueueTypes.DEQUEUE_OCCURRENCE,
    payload: { id },
  };
}

export function enqueueChecklist({
  id,
  object,
}: EnqueueChecklistProps): EnqueueChecklistAction {
  return {
    type: OfflineQueueTypes.ENQUEUE_CHECKLIST,
    payload: { id, object },
  };
}

export function dequeueChecklist({
  id,
}: DequeueChecklistProps): DequeueChecklistAction {
  return {
    type: OfflineQueueTypes.DEQUEUE_CHECKLIST,
    payload: { id },
  };
}
