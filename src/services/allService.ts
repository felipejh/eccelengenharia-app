import { AxiosResponse } from 'axios';
import { Checklist } from '~/models/checklist.model';
import api from '~/services/api';

interface AllService {
  (): Promise<AxiosResponse<Checklist>>;
}

export const getAll: AllService = async () => api.get('/api/v1/all');
