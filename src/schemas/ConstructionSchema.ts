const ConstructionSchema = {
  name: 'Construction',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
    nome: 'string',
    tipo: 'int',
    percentualConclusao: 'string',
    imagem: 'string',
    ativo: 'int',
    createdAt: 'string',
    updatedAt: 'string?',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
    descType: 'string',
    imgSystemPath: 'string?',
  },
};

export default ConstructionSchema;
