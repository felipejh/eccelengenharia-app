import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';
import { ChecklistAnswer } from './checklist-answers.model';

export type ChecklistScreenRouteProp = RouteProp<StackParamList, 'Checklist'>;

export type ChecklistScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Checklist'
>;

export type ChecklistProps = {
  navigation: ChecklistScreenNavigationProp;
  route: ChecklistScreenRouteProp;
};

export interface Checklist {
  id: number;
  item_conferir: string;
  tolerancia: string;
  ativo: number;
  createdAt: string;
  updatedAt: string;
  gruposapontamentoId: number;
  usuarioCreateId: number;
  usuarioUpdateId: number | null;
  answers?: Array<ChecklistAnswer>;
}
