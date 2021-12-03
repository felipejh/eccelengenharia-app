export interface Appointment {
  id: number;
  ideccel: number;
  titulo: string;
  title: string;
  descricao: string;
  description: string | null;
  ativo: number;
  active: number;
  gruposapontamentoId: number;
  appointmentGroupId: number;
  usuarioCreateId: number;
  userCreateId: number;
  usuarioUpdateId: number;
  userUpdatedId: number;
  createdAt: string;
  updatedAt: string;
}
