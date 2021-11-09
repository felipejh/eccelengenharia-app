import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { Appointment } from '~/models/appointment.model';
import { ChecklistAnswer } from '~/models/checklist-answers.model';
import { Checklist } from '~/models/checklist.model';
import { Construction } from '~/models/construction.model';
import { Group } from '~/models/groups.model';
import { Occurrence } from '~/models/occurrences.model';
import { Plan } from '~/models/plans.model';
import api from '~/services/api';
import getRealm from '~/services/realm';
import { getConstructionModelAdapter } from './constructionService';
import { getPlansModelAdapter } from './plansService';

interface Props {
  apontamentos: Array<Appointment>;
  checklists: Array<Checklist>;
  grupos: Array<Group>;
  ocorrencias: Array<Occurrence>;
  obras: Array<Construction>;
  plantas: Array<Plan>;
  checklistsAnswers: Array<ChecklistAnswer>;
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
  checklistsAnswers: Array<ChecklistAnswer>;
}

export const getAll: AllService = async () => api.get('/api/v1/all');

export async function getAllData(): Promise<void> {
  try {
    const realm = await getRealm();

    const response = await api.get('/api/v1/all');

    if (response.status !== 200) {
      Alert.alert(
        'Ops',
        `Ocorreu um erro ao sincronizar os dados para operar em modo offline 1: ${response.status}`,
      );
      return;
    }

    const {
      grupos,
      apontamentos,
      obras,
      plantas,
      ocorrencias,
      checklists,
      checklistsAnswers,
    }: ResponseAll = response.data;

    const constructionList = await getConstructionModelAdapter(obras);
    const plansList = await getPlansModelAdapter(plantas);

    realm.write(() => {
      realm.deleteAll();

      constructionList
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

      plansList
        .filter(plan => plan.ativo === 1)
        .forEach(plan => {
          realm.create('Plans', plan, Realm.UpdateMode.All);
        });

      checklists
        .filter(checklist => checklist.ativo === 1)
        .forEach(checklist => {
          realm.create('Checklists', checklist, Realm.UpdateMode.All);
        });

      checklistsAnswers.forEach(checklistsAnswer => {
        realm.create(
          'ChecklistsAnswers',
          checklistsAnswer,
          Realm.UpdateMode.All,
        );
      });
    });

    realm.close();
  } catch (error) {
    Alert.alert(
      'Ops',
      `Ocorreu um erro ao sincronizar os dados para operar em modo offline 2: ${error}`,
    );
  }
}
