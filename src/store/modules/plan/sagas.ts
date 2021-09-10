import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import * as Sentry from '@sentry/react-native';
import api from '~/services/api';
import {
  GetPlanListRequestAction,
  PlanActionTypes,
} from '~/store/types/plan.types';
import { getPlanListFailure, getPlanListSuccess } from './actions';
import getConstructionType from '~/utils/getConstructionType';

interface Props {
  constructionId: number;
}

export function* getPlan({ payload }: { payload: Props }): any {
  try {
    const { constructionId } = payload;

    const ws = '/api/v1/plantas';

    const response = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as plantas');
      return yield put(getPlanListFailure());
    }

    const newPlans = response.data
      .filter(plan => plan.obraId === constructionId)
      .map(c => ({
        ...c,
        name: c.nome,
        constructionId: c.obraId,
        type: c.tipo,
        descType: getConstructionType(c.tipo),
        active: c.ativo,
        userCreateId: c.usuarioCreateId,
        userUpdatedId: c.usuarioUpdateId,
        img: `${API_URL}${c.url}`,
      }));
    console.tron.log(newPlans);

    return yield put(getPlanListSuccess(newPlans));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getPlanListFailure());
  }
}

export default all([
  takeLatest(PlanActionTypes.GET_PLAN_LIST_REQUEST, getPlan),
]);
