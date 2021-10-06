const OccurrenceSchema = {
  name: 'Occurrences',
  primaryKey: 'id',
  properties: {
    id: 'int',
    descricao: 'string?',
    coord_x: 'string',
    coord_y: 'string',
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
  },
};

export default OccurrenceSchema;
