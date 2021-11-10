const OccurrenceSchema = {
  name: 'Occurrences',
  primaryKey: 'id',
  properties: {
    id: 'int',
    descricao: 'string?',
    coord_x: 'double',
    coord_y: 'double',
    concluido: 'int?',
    dataConclusao: 'string?',
    adiado: 'int?',
    dataAdiamento: 'string?',
    createdAt: 'string?',
    updatedAt: 'string?',
    obraId: 'int?',
    plantaId: 'int?',
    apontamentoId: 'int?',
    usuarioId: 'int?',
    usuarioAdiamentoId: 'int?',
    usuarioConclusaoId: 'int?',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
    usuario: 'User',
    apontamento: 'Appointments',
  },
};

export default OccurrenceSchema;
