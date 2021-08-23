import { AxiosResponse } from 'axios';
import api from '~/services/api';
import { Appointment } from '~/models/appointment.model';

interface AppointmentsService {
  (): Promise<Array<Appointment>>;
}

export const getAppointments: AppointmentsService = async () => {
  const response: AxiosResponse<Array<Appointment>> = await api.get(
    '/api/v1/apontamentos?eager=true',
  );

  const newAppointments = response.data.map(a => ({
    ...a,
    title: a.titulo,
    description: a.descricao,
    active: a.ativo,
    appointmentGroupId: a.gruposapontamentoId,
    userCreateId: a.usuarioCreateId,
    userUpdatedId: a.usuarioUpdateId,
  }));

  return newAppointments;
};
