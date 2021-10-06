const AppointmentsSchema = {
  name: 'Appointments',
  primaryKey: 'id',
  properties: {
    id: 'int',
    titulo: 'string',
    descricao: 'string?',
    ativo: 'int',
    createdAt: 'string',
    updatedAt: 'string?',
    gruposapontamentoId: 'int',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
  },
};

export default AppointmentsSchema;
