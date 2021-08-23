import { AxiosResponse } from 'axios';
import { API_URL } from 'react-native-dotenv';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import getConstructionType from '~/utils/getConstructionType';

interface GetPlansListProps {
  constructionId: number;
}

interface PlansListService {
  (obj: GetPlansListProps): Promise<Array<Plan>>;
}

export const getPlansList: PlansListService = async ({ constructionId }) => {
  const response: AxiosResponse<Array<Plan>> = await api.get('/api/v1/plantas');

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

  return newPlans;
};
