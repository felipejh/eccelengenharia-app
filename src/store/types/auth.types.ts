export enum AuthTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '@auth/SIGN_IN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT',
}

export interface SignInRequestProps {
  user: string;
  password: string;
}

export interface SignInSuccessProps {
  token: string;
  displayName: string;
  role: Array<string>;
  userId: number;
}

export interface SignInRequestAction {
  type: AuthTypes.SIGN_IN_REQUEST;
  payload: SignInRequestProps;
}

export interface SignInSuccessAction {
  type: AuthTypes.SIGN_IN_SUCCESS;
  payload: SignInSuccessProps;
}

export interface SignInFailureAction {
  type: AuthTypes.SIGN_IN_FAILURE;
}

export interface SignOutAction {
  type: AuthTypes.SIGN_OUT;
}

export type AuthActionProps =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutAction;
