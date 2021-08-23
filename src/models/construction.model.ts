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
  percentualConclusao: string;
  ativo: number;
  usuarioCreateId: number;
  usuarioUpdateId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  img: string;
  type: number;
  descType: string;
  name: string;
  completionPercentage: string;
  active: number;
  solvedOccurrences: number;
  pendingOccurrences: number;
  userCreatedId: number;
  userUpdatedId: number;
  imagem: string;
  imgBase64: string;
}
