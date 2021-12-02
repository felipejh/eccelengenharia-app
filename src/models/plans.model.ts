import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';
import { Checklist } from './checklist.model';
import { Construction } from './construction.model';

export type PlansScreenRouteProp = RouteProp<StackParamList, 'Plans'>;

export type PlansScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Plans'
>;

export type PlansProps = {
  navigation: PlansScreenNavigationProp;
  route: PlansScreenRouteProp;
};

export interface Plan {
  id: number;
  nome: string;
  name: string;
  tipo: number;
  descType: string;
  ativo: number;
  obraId: Construction['id'];
  url: string;
  imagem: string;
  usuarioCreateId: number;
  usuarioUpdateId: number;
  createdAt: string;
  updatedAt: string;
  imgSystemPath?: string;
  checklist: Array<Checklist>;
  imgUrl: string;
}
