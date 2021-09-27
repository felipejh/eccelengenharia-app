import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { Appointment } from '~/models/appointment.model';
import { Checklist } from '~/models/checklist.model';
import { Construction } from '~/models/construction.model';
import { Group } from '~/models/groups.model';
import { Occurrence } from '~/models/occurrences.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import getRealm from '~/services/realm';

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

interface ResponseAll {
  grupos: Array<Group>;
  apontamentos: Array<Appointment>;
  obras: Array<Construction>;
  plantas: Array<Plan>;
  ocorrencias: Array<Occurrence>;
  checklists: Array<Checklist>;
}

export const getAll: AllService = async () => api.get('/api/v1/all');

export async function getAllData(): Promise<void> {
  try {
    const realm = await getRealm();

    const response = await api.get('/api/v1/all');

    if (response.status !== 200) {
      Alert.alert(
        'Ocorreu um erro ao sincronizar os dados para operar em modo offline',
      );
      return;
    }

    const {
      grupos,
      apontamentos,
      obras,
      // plantas,
      ocorrencias,
      checklists,
    }: ResponseAll = response.data;

    realm.write(() => {
      realm.deleteAll();

      obras
        .filter(construction => construction.ativo === 1)
        .forEach(construction => {
          realm.create('Construction', construction, Realm.UpdateMode.All);
        });

      grupos
        .filter(group => group.ativo === 1)
        .forEach(group => {
          realm.create('Groups', group, Realm.UpdateMode.All);
        });

      apontamentos
        .filter(appointment => appointment.ativo === 1)
        .forEach(appointment => {
          realm.create('Appointments', appointment, Realm.UpdateMode.All);
        });

      ocorrencias.forEach(occurrence => {
        realm.create('Occurrences', occurrence, Realm.UpdateMode.All);
      });

      checklists
        .filter(checklist => checklist.ativo === 1)
        .forEach(checklist => {
          realm.create('Checklists', checklist, Realm.UpdateMode.All);
        });
    });

    realm.close();
  } catch (error) {
    Alert.alert(
      'Ocorreu um erro ao sincronizar os dados para operar em modo offline.',
    );
  }
}
