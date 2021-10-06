const PlansSchema = {
  name: 'Plans',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
    nome: 'string',
    tipo: 'int',
    imagem: 'string',
    ativo: 'int',
    createdAt: 'string',
    updatedAt: 'string?',
    obraId: 'int',
    usuarioCreateId: 'int?',
    usuarioUpdateId: 'int?',
    descType: 'string',
    imgSystemPath: 'string?',
  },
};

export default PlansSchema;
