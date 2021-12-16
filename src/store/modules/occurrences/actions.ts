import {
  AddOccurrenceRequestAction,
  AddOccurrenceRequestProps,
  OccurrencesTypes,
} from '~/store/types/occurrences.types';

export function addOccurrenceRequest({
  coordX,
  coordY,
  constructionId,
  planId,
  userId,
  userCreateId,
  userUpdateId,
  appointmentId,
}: AddOccurrenceRequestProps): AddOccurrenceRequestAction {
  return {
    type: OccurrencesTypes.ADD_OCCURRENCE_REQUEST,
    payload: {
      coordX,
      coordY,
      constructionId,
      planId,
      userId,
      userCreateId,
      userUpdateId,
      appointmentId,
    },
  };
}
