import {
  EnqueueChecklistProps,
  EnqueueOccurrenceProps,
} from '~/store/types/offlineQueue';
import {
  postOccurrence,
  putPostponedOccurrence,
  putConclusionOccurrence,
  PostOccurrenceProps,
  PutPostponedProps,
  PutConclusionProps,
} from './occurrencesServices';

import api from '~/services/api';

const sendQueueService = async (
  payload: EnqueueOccurrenceProps,
): Promise<boolean> => {
  const { object } = payload;
  const { typeActionApi, data } = object;

  try {
    if (typeActionApi === 'occurrence/post') {
      const body = {
        ...data,
      } as PostOccurrenceProps;

      await postOccurrence(body);
    }

    if (typeActionApi === 'occurrence/postponed') {
      const body = {
        ...data,
      } as PutPostponedProps;

      await putPostponedOccurrence(body);
    }

    if (typeActionApi === 'occurrence/concluded') {
      const body = {
        ...data,
      } as PutConclusionProps;

      await putConclusionOccurrence(body);
    }

    return true;
  } catch {
    return false;
  }
};

const sendChecklistQueue = async (
  checklistPayload: EnqueueChecklistProps,
): Promise<boolean> => {
  const { object } = checklistPayload;
  const { data } = object;
  const { situacao, dth_resposta, checklistId, plantaId } = data;

  await api.post('/api/v1/checklists_answers', {
    situacao,
    dth_resposta,
    checklistId,
    plantaId,
  });

  return true;
};

export { sendQueueService, sendChecklistQueue };
