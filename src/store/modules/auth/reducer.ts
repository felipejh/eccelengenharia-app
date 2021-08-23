import produce from 'immer';
import { AuthActionProps } from '~/store/types/auth.types';

interface StateProps {
  token: string | undefined;
  loading: boolean;
  displayName: string | undefined;
  role: string[] | undefined;
  isSigned: boolean | undefined;
  userId: number | undefined;
}

const INITIAL_STATE: StateProps = {
  token: undefined,
  loading: false,
  displayName: undefined,
  role: undefined,
  isSigned: undefined,
  userId: undefined,
};

export default function auth(
  state = INITIAL_STATE,
  action: AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.token = action.payload.token;
        draft.displayName = action.payload.displayName;
        draft.role = action.payload.role;
        draft.isSigned = true;
        draft.userId = action.payload.userId;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = undefined;
        draft.loading = false;
        draft.displayName = undefined;
        draft.role = undefined;
        draft.isSigned = false;
        draft.userId = undefined;
        break;
      }
      default:
    }
  });
}
