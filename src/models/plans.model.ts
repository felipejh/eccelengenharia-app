import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';
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
  type: number;
  descType: string;
  ativo: number;
  active: number;
  obraId: Construction['id'];
  constructionId: Construction['id'];
  url: string;
  img: string;
  usuarioCreateId: number;
  userCreateId: number;
  usuarioUpdateId: number;
  userUpdatedId: number;
  createdAt: string;
  updatedAt: string;
}
