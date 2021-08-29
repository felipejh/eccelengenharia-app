import { all, call, put, takeLatest, SagaReturnType } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import * as Sentry from '@sentry/react-native';
import { AuthTypes, SignInRequestAction } from '~/store/types/auth.types';
import api from '~/services/api';
import { authenticate } from '~/services/authService';
import { signInSuccess, signInFailure } from '~/store/modules/auth/actions';

type LoginServiceResponse = SagaReturnType<typeof authenticate>;

export function* signIn({ payload }: SignInRequestAction): any {
  try {
    Alert.alert('fazendo login');
    const { user, password } = payload;

    const ws = '/v1/auth';
    const body = {
      email: user,
      password,
    };

    const response: LoginServiceResponse = yield call(api.post, ws, body);

    const { data } = response;

    if (data.error) {
      Alert.alert(data.error[0].type, data.error[0].message);
      return yield put(signInFailure());
    }

    const token = data.access_token;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    return yield put(
      signInSuccess({
        token,
        displayName: data.user.data.displayName,
        role: data.user.role,
        userId: data.user.entity.id,
      }),
    );
  } catch (error) {
    Alert.alert('Ops', `Ocorreu um erro : ${error} + ${API_URL}`);
    Sentry.captureException(error);
    return yield put(signInFailure());
  }
}

export function setToken({ payload }: any) {
  if (!payload) return;

  if (!payload.auth.token) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
]);
