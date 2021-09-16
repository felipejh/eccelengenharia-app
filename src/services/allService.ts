import { AxiosResponse } from 'axios';
import { Appointment } from '~/models/appointment.model';
import { Checklist } from '~/models/checklist.model';
import { Construction } from '~/models/construction.model';
import { Group } from '~/models/groups.model';
import { Occurrence } from '~/models/occurrences.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';

interface Props {
  apontamentos: Array<Appointment>;
  checklists: Array<Checklist>;
  grupos: Array<Group>;
  ocorrencias: Array<Occurrence>;
  obras: Array<Construction>;
  plantas: Array<Plan>;
}
interface AllService {
  (): Promise<AxiosResponse<Props>>;
}

export const getAll: AllService = async () => api.get('/api/v1/all');
