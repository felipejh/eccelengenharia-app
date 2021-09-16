import { produce } from 'immer';
import { Occurrence } from '~/models/occurrences.model';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';
import {
  OccurrenceActionProps,
  OccurrencesActionTypes,
} from '~/store/types/occurrences.types';

interface StateProps {
  loading: boolean;
  listOccurrences: Array<Occurrence>;
}

const INITIAL_STATE: StateProps = {
  loading: false,
  listOccurrences: [],
};

export default function occurrences(
  state = INITIAL_STATE,
  action: OccurrenceActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case OccurrencesActionTypes.GET_OCCURRENCE_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case OccurrencesActionTypes.GET_OCCURRENCE_LIST_SUCCESS: {
        if (draft.listOccurrences.length > 0) {
          action.payload.forEach(p => {
            const findIndex = draft.listOccurrences.findIndex(
              l => l.id === p.id,
            );
            if (findIndex) {
              draft.listOccurrences.splice(findIndex, 1, p);
            }
          });

          draft.loading = false;
          break;
        }

        draft.loading = false;
        draft.listOccurrences = action.payload;
        break;
      }
      case OccurrencesActionTypes.GET_OCCURRENCE_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      case OccurrencesActionTypes.GET_OCCURRENCE_LIST_ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.listOccurrences = [];
        draft.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
}
