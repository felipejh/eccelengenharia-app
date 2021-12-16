import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import api from '~/services/api';
import { Occurrence } from '~/models/occurrences.model';
import OccurrencesTypes from '~/store/modules/occurrences/reducer';
import { AddOccurrenceRequestAction } from '~/store/types/occurrences.types';

interface GetOccurrenceByPlanProps {
  constructionId: number;
  planId: number;
}
interface GetOccurrenceByPlanService {
  (obj: GetOccurrenceByPlanProps): Promise<Array<Occurrence>>;
}
interface PostOccurrenceProps {
  coordX: number;
  coordY: number;
  constructionId: number;
  planId: number;
  userId: number;
  userCreateId: number;
  userUpdateId?: number;
  appointmentId: number | undefined | null;
}
interface PutPostponedProps {
  id: number;
  postponedDate: Date;
  postponedUserId: number;
}

interface PutConclusionProps {
  id: number;
  conclusionDate: Date;
  conclusionUserId: number;
}
interface PostOccurrenceService {
  (obj: PostOccurrenceProps): Promise<void>;
}

interface PutPostponedService {
  (obj: PutPostponedProps): Promise<void>;
}

interface PutConclusionService {
  (obj: PutConclusionProps): Promise<void>;
}

export const getOccurrenceByPlan: GetOccurrenceByPlanService = async ({
  constructionId,
  planId,
}) => {
  const response: AxiosResponse<Array<Occurrence>> = await api.get(
    `/api/v1/ocorrencias/obra/${constructionId}`,
  );

  const newOccurrences = response?.data?.filter(o => o.plantaId === planId);

  return newOccurrences;
};

export const postOccurrence: PostOccurrenceService = async ({
  coordX,
  coordY,
  constructionId,
  planId,
  userId,
  userCreateId,
  userUpdateId,
  appointmentId,
}) => {
  const url = '/api/v1/ocorrencias';

  const body = {
    coord_x: coordX,
    coord_y: coordY,
    obraId: constructionId,
    plantaId: planId,
    usuarioId: userId,
    usuarioCreateId: userCreateId,
    usuarioUpdateId: userUpdateId,
    apontamentoId: appointmentId,
  };

  await api.post(url, body);
};

export const putPostponedOccurrence: PutPostponedService = async ({
  id,
  postponedUserId,
  postponedDate,
}) => {
  const url = '/api/v1/ocorrencias';

  const body = {
    id,
    usuarioAdiamentoId: postponedUserId,
    dataAdiamento: postponedDate,
    adiado: 1,
  };

  await api.put(url, body);
};

export const putConclusionOccurrence: PutConclusionService = async ({
  id,
  conclusionUserId,
  conclusionDate,
}) => {
  const url = '/api/v1/ocorrencias';

  const body = {
    id,
    usuarioConclusaoId: conclusionUserId,
    dataConclusao: conclusionDate,
    concluido: 1,
  };

  await api.put(url, body);
};

export function* addOccurrence({ payload }: AddOccurrenceRequestAction): any {
  const {
    coordX,
    coordY,
    constructionId,
    planId,
    userId,
    userCreateId,
    userUpdateId,
    appointmentId,
  } = payload;

  const url = '/api/v1/ocorrencias';

  const body = {
    coord_x: coordX,
    coord_y: coordY,
    obraId: constructionId,
    plantaId: planId,
    usuarioId: userId,
    usuarioCreateId: userCreateId,
    usuarioUpdateId: userUpdateId,
    apontamentoId: appointmentId,
  };

  const response = yield call(api.post, url, body);

  yield put(OccurrencesTypes.addOccurrenceSuccess(response.data));
}
