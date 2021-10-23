import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';

export type ChecklistAnswersScreenRouteProp = RouteProp<
  StackParamList,
  'ChecklistAnswers'
>;

export type ChecklistAnswersScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'ChecklistAnswers'
>;

export type ChecklistAnswersProps = {
  navigation: ChecklistAnswersScreenNavigationProp;
  route: ChecklistAnswersScreenRouteProp;
};

export interface ChecklistAnswer {
  id: number;
  situacao: string;
  dth_resposta: string | null;
  createdAt: string;
  updatedAt: string | null;
  checklistId: number;
  plantaId: number;
  ocorrenciaId: number | null;
  usuarioCreateId: number | null;
  usuarioUpdateId: number | null;
  usuarioCreate?: {
    id: number;
    usuario: string;
    nome: string;
  };
}
