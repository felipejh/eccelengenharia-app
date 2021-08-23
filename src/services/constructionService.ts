import { AxiosResponse } from 'axios';
import { Construction } from '~/models/construction.model';
import api from '~/services/api';

interface ConstructionListService {
  (): Promise<AxiosResponse<Array<Construction>>>;
}

export const getConstructionList: ConstructionListService = async () => {
  return api.get('/api/v1/obras');
};
