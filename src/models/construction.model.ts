import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';

export type ConstructionScreenRouteProp = RouteProp<
  StackParamList,
  'Dashboard'
>;

export type ConstructionScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Dashboard'
>;

export type ConstructionProps = {
  navigation: ConstructionScreenNavigationProp;
  route: ConstructionScreenRouteProp;
};

export interface Construction {
  id: number;
  nome: string;
  tipo: number;
  percentualConclusao: number;
  ativo: number;
  usuarioCreateId: number;
  usuarioUpdateId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  img: string;
  descType: string;
  solvedOccurrences: string;
  pendingOccurrences: string;
  imagem: string;
  imgSystemPath?: string;
}
