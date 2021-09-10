import { all, takeLatest, put, SagaReturnType, call } from 'redux-saga/effects';
import { API_URL } from 'react-native-dotenv';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import { AllTypes } from '~/store/types/all.types';
import { allSuccess, allFailure } from '~/store/modules/all/actions';
import { getConstructionListSuccess } from '~/store/modules/construction/actions';
import { getAll } from '~/services/allService';
import api from '~/services/api';
import { Group } from '~/models/groups.model';
import { Appointment } from '~/models/appointment.model';
import { Construction } from '~/models/construction.model';
import { Plan } from '~/models/plans.model';
import { Occurrence } from '~/models/occurrences.model';
import { Checklist } from '~/models/checklist.model';
import getConstructionType from '~/utils/getConstructionType';

type GetAllServiceResponse = SagaReturnType<typeof getAll>;

interface ResponseDataProps {
  grupos: Array<Group>;
  apontamentos: Array<Appointment>;
  obras: Array<Construction>;
  plantas: Array<Plan>;
  ocorrencias: Array<Occurrence>;
  checklist: Array<Checklist>;
}

export function* getAllList(): any {
  try {
    const ws = '/api/v1/all';

    const response: GetAllServiceResponse = yield call(api.get, ws);

    if (response.status !== 200) {
      Alert.alert('Ocorreu um erro ao buscar as obras');
      return yield put(allFailure());
    }

    const {
      grupos,
      apontamentos,
      obras,
      plantas,
      ocorrencias,
      checklists,
    }: ResponseDataProps = response.data;

    const listConstruction: Array<Construction> = yield all(
      obras
        .sort((a, b) => {
          if (Number(a.percentualConclusao) < Number(b.percentualConclusao)) {
            return 1;
          }
          return -1;
        })
        .map(async c => ({
          ...c,
          name: c.nome,
          descType: getConstructionType(c.tipo),
          type: c.tipo,
          completionPercentage: c.percentualConclusao,
          active: c.ativo,
          userCreatedId: c.usuarioCreateId,
          userUpdatedId: c.usuarioUpdateId,
          img: `${API_URL}${c.url}`,
          imgBase64: await (
            await api.get(`/api/v1/image/base64/${c.imagem}`)
          ).data.base64,
        })),
    );
    yield put(getConstructionListSuccess(listConstruction));

    return yield put(allSuccess());
  } catch (error) {
    Sentry.captureException(error);
    return yield put(allFailure());
  }
}

export default all([takeLatest(AllTypes.ALL_REQUEST, getAllList)]);
