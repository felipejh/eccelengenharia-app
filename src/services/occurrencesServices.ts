import { AxiosResponse } from 'axios';
import api from '~/services/api';
import { Occurrence } from '~/models/occurrences.model';

interface GetOccurrenceByPlanProps {
  constructionId: number;
  planId: number;
}
interface GetOccurrenceByPlanService {
  (obj: GetOccurrenceByPlanProps): Promise<Array<Occurrence>>;
}
export interface PostOccurrenceProps {
  coordX: number;
  coordY: number;
  constructionId: number;
  planId: number;
  userId: number;
  userCreateId: number;
  userUpdateId?: number;
  appointmentId: number | undefined | null;
}
export interface PutPostponedProps {
  id: number;
  postponedDate: Date;
  postponedUserId: number;
}

export interface PutConclusionProps {
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
