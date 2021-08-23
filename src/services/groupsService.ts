import { AxiosResponse } from 'axios';

import api from '~/services/api';
import { Group } from '~/models/groups.model';

interface GetGroupsService {
  (): Promise<Array<Group>>;
}

export const getGroups: GetGroupsService = async () => {
  const response: AxiosResponse<Array<Group>> = await api.get('/api/v1/grupos');

  const newGroups = response.data.map(g => ({
    ...g,
    title: g.titulo,
    active: g.ativo,
    userCreateId: g.usuarioCreateId,
    userUpdatedId: g.usuarioUpdateId,
  }));

  return newGroups;
};
