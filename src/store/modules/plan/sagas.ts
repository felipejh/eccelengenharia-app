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
import { Plan } from '~/models/plans.model';

interface Props {
  constructionId: number;
}

async function teste() {
  try {
    const response = await api.get(
      `/api/v1/image/base64/5cb87H_crop_imagem.jpg`,
    );

    const b = response.data.base64;

    return b;
  } catch {
    return 'NAO BOMBOU';
  }
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

    // const data: Array<Plan> = yield all(
    //   response.data
    //     .filter(plan => plan.obraId === constructionId)
    //     .map(async c => ({
    //       ...c,
    //       name: c.nome,
    //       constructionId: c.obraId,
    //       type: c.tipo,
    //       descType: getConstructionType(c.tipo),
    //       active: c.ativo,
    //       userCreateId: c.usuarioCreateId,
    //       userUpdatedId: c.usuarioUpdateId,
    //       img: `${API_URL}${c.url}`,
    //       imgBase64: await (
    //         await api.get(`/api/v1/image/base64/${c.imagem}`)
    //       ).data.base64,
    //     })),
    // );
    const data: Array<Plan> = yield all(
      response.data
        .filter(plan => plan.obraId === constructionId)
        .map(async c => ({
          ...c,
          name: c.nome,
          constructionId: c.obraId,
          type: c.tipo,
          descType: getConstructionType(c.tipo),
          active: c.ativo,
          userCreateId: c.usuarioCreateId,
          userUpdatedId: c.usuarioUpdateId,
          img: `${API_URL}${c.url}`,
          imgBase64: await teste(),
        })),
    );
    console.tron.log(data);

    return yield put(getPlanListSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    return yield put(getPlanListFailure());
  }
}

export default all([
  takeLatest(PlanActionTypes.GET_PLAN_LIST_REQUEST, getPlan),
]);
