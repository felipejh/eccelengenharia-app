import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '~/routes/@types';
import { User } from '~/models/user.model';
import { Appointment } from '~/models/appointment.model';

export type OccurrencesScreenRouteProp = RouteProp<
  StackParamList,
  'Occurrences'
>;

export type OccurrencesScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Occurrences'
>;

export type OccurrencesProps = {
  navigation: OccurrencesScreenNavigationProp;
  route: OccurrencesScreenRouteProp;
};

export interface Occurrence {
  id: number;
  descricao: string;
  coord_x: string;
  coord_y: string;
  concluido: number;
  dataConclusao: string | null;
  adiado: number;
  dataAdiamento: string;
  obraId: number;
  plantaId: number;
  apontamentoId: number | null;
  usuarioId: number | null;
  usuarioAdiamentoId: number | null;
  usuarioConclusaoId: number | null;
  usuarioCreateId: number | null;
  usuarioUpdateId: number | null;
  apontamento: Appointment | null;
  usuario: User | null;
  usuarioAdiamento: User | null;
  usuarioConclusao: User | null;
  createdAt: string;
  updatedAt: string;
}
