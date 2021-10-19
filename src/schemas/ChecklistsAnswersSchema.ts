const ChecklistsAnswersSchema = {
  name: 'ChecklistsAnswers',
  primaryKey: 'id',
  properties: {
    id: 'int',
    situacao: 'string',
    dth_resposta: 'string?',
    createdAt: 'string',
    updatedAt: 'string?',
    checklistId: 'int',
    plantaId: 'int',
    ocorrenciaId: 'int?',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
  },
};

export default ChecklistsAnswersSchema;
