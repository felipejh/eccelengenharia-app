import {
  PostOccurrenceProps,
  PutConclusionProps,
  PutPostponedProps,
} from '~/services/occurrencesServices';

export enum OfflineQueueTypes {
  ENQUEUE_OCCURRENCE = '@offline/ENQUEUE_OCCURRENCE',
  DEQUEUE_OCCURRENCE = '@offline/DEQUEUE_OCCURRENCE',
  ENQUEUE_CHECKLIST = '@offline/ENQUEUE_CHECKLIST',
  DEQUEUE_CHECKLIST = '@offline/DEQUEUE_CHECKLIST',
}

type EnqueueOccurrenceType =
  | 'occurrence/post'
  | 'occurrence/postponed'
  | 'occurrence/concluded';

type EnqueueChecklistData = {
  situacao: 'APROVADO' | 'REPROVADO';
  dth_resposta: Date;
  checklistId: number;
  plantaId: number;
};

export type EnqueueOccurrenceData =
  | PostOccurrenceProps
  | PutPostponedProps
  | PutConclusionProps;

export interface EnqueueOccurrenceProps {
  id: string;
  object: {
    typeActionApi: EnqueueOccurrenceType;
    data: EnqueueOccurrenceData;
  };
}

export interface DequeueOccurrenceProps {
  id: string;
}

export interface EnqueueOccurrenceAction {
  type: OfflineQueueTypes.ENQUEUE_OCCURRENCE;
  payload: EnqueueOccurrenceProps;
}

export interface DequeueOccurrenceAction {
  type: OfflineQueueTypes.DEQUEUE_OCCURRENCE;
  payload: DequeueOccurrenceProps;
}

export interface EnqueueChecklistProps {
  id: string;
  object: {
    data: EnqueueChecklistData;
  };
}

export interface DequeueChecklistProps {
  id: string;
}

export interface EnqueueChecklistAction {
  type: OfflineQueueTypes.ENQUEUE_CHECKLIST;
  payload: EnqueueChecklistProps;
}

export interface DequeueChecklistAction {
  type: OfflineQueueTypes.DEQUEUE_CHECKLIST;
  payload: DequeueChecklistProps;
}

export type OfflineQueueActionProps =
  | EnqueueOccurrenceAction
  | DequeueOccurrenceAction
  | EnqueueChecklistAction
  | DequeueChecklistAction;
