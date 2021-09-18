import { all, takeLatest, put, SagaReturnType, call } from 'redux-saga/effects';
import { API_URL } from 'react-native-dotenv';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import { AllTypes } from '~/store/types/all.types';
import { allSuccess, allFailure } from '~/store/modules/all/actions';
import {
  getConstructionListAllRequest,
  getConstructionListFailure,
  getConstructionListSuccess,
} from '~/store/modules/construction/actions';
import { getAll } from '~/services/allService';
import api from '~/services/api';
import { Group } from '~/models/groups.model';
import { Appointment } from '~/models/appointment.model';
import { Construction } from '~/models/construction.model';
import { Plan } from '~/models/plans.model';
import { Occurrence } from '~/models/occurrences.model';
import { Checklist } from '~/models/checklist.model';
import getConstructionType from '~/utils/getConstructionType';
import { getPlanListAllRequest, getPlanListSuccess } from '../plan/actions';
import { getImgSystemPath } from '~/utils/utils';
import {
  getGroupListAllRequest,
  getGroupListFailure,
  getGroupListSuccess,
} from '../groups/actions';
import {
  getAppointmentListAllRequest,
  getAppointmentListFailure,
  getAppointmentListSuccess,
} from '../appointments/actions';
import {
  getOccurrenceListAllRequest,
  getOccurrenceListFailure,
  getOccurrenceListSuccess,
} from '../occurrences/actions';
import {
  getChecklistListAllRequest,
  getChecklistListFailure,
  getChecklistListSuccess,
} from '../checklists/actions';

type GetAllServiceResponse = SagaReturnType<typeof getAll>;

interface ResponseDataProps {
  grupos: Array<Group>;
  apontamentos: Array<Appointment>;
  obras: Array<Construction>;
  plantas: Array<Plan>;
  ocorrencias: Array<Occurrence>;
  checklists: Array<Checklist>;
}

function* getConstructionList(obras: Array<Construction>) {
  const data: Array<Construction> = yield all(
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
        imgSystemPath: await getImgSystemPath(`${API_URL}${c.url}`, c.imagem),
      })),
  );

  return data;
}

function* getPlanList(plantas: Array<Plan>) {
  const data: Array<Plan> = yield all(
    plantas.map(async c => ({
      ...c,
      name: c.nome,
      constructionId: c.obraId,
      type: c.tipo,
      descType: getConstructionType(c.tipo),
      active: c.ativo,
      userCreateId: c.usuarioCreateId,
      userUpdatedId: c.usuarioUpdateId,
      img: `${API_URL}${c.url}`,
      imgSystemPath: await getImgSystemPath(`${API_URL}${c.url}`, c.imagem),
    })),
  );

  return data;
}

export function* getAllList(): any {
  try {
    yield put(getConstructionListAllRequest());
    yield put(getPlanListAllRequest());
    yield put(getGroupListAllRequest());
    yield put(getAppointmentListAllRequest());
    yield put(getOccurrenceListAllRequest());
    yield put(getChecklistListAllRequest());

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

    const {
      constructionList,
      planList,
      groupList,
      appointmentList,
      occurrenceList,
      checklistList,
    } = yield all({
      constructionList: call(() => getConstructionList(obras)),
      planList: call(() => getPlanList(plantas)),
      groupList: grupos,
      appointmentList: apontamentos,
      occurrenceList: ocorrencias,
      checklistList: checklists,
    });

    yield put(getConstructionListSuccess(constructionList));
    yield put(getPlanListSuccess(planList));
    yield put(getGroupListSuccess(groupList));
    yield put(getAppointmentListSuccess(appointmentList));
    yield put(getOccurrenceListSuccess(occurrenceList));
    yield put(getChecklistListSuccess(checklistList));

    return yield put(allSuccess());
  } catch (error) {
    Sentry.captureException(error);
    yield put(getConstructionListFailure());
    yield put(getPlanListAllRequest());
    yield put(getGroupListFailure());
    yield put(getAppointmentListFailure());
    yield put(getOccurrenceListFailure());
    yield put(getChecklistListFailure());

    return yield put(allFailure());
  }
}

export default all([takeLatest(AllTypes.ALL_REQUEST, getAllList)]);
