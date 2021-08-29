import { Alert } from 'react-native';
import {
  AuthTypes,
  SignInFailureAction,
  SignInRequestAction,
  SignInRequestProps,
  SignInSuccessAction,
  SignInSuccessProps,
  SignOutAction,
} from '~/store/types/auth.types';

export function signInRequest({
  user,
  password,
}: SignInRequestProps): SignInRequestAction {
  Alert.alert('Action');
  return {
    type: AuthTypes.SIGN_IN_REQUEST,
    payload: { user, password },
  };
}

export function signInSuccess({
  token,
  displayName,
  role,
  userId,
}: SignInSuccessProps): SignInSuccessAction {
  return {
    type: AuthTypes.SIGN_IN_SUCCESS,
    payload: { token, displayName, role, userId },
  };
}

export function signInFailure(): SignInFailureAction {
  return {
    type: AuthTypes.SIGN_IN_FAILURE,
  };
}

export function signOut(): SignOutAction {
  return {
    type: AuthTypes.SIGN_OUT,
  };
}
