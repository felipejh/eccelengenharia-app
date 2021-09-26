export interface Checklist {
  id: number;
  item_conferir: string;
  tolerancia: string;
  ativo: number;
  createdAt: string;
  updatedAt: string;
  gruposapontamentoId: number;
  usuarioCreateId: number;
  usuarioUpdateId: number | null;
  answers?: {
    id: number;
    situacao: string;
    dth_resposta: string;
    createdAt: string;
    updatedAt: string;
    checklistId: number;
    plantaId: number;
    ocorrenciaId: number | null;
    usuarioCreateId: number;
    usuarioUpdateId: number | null;
    usuarioCreate: {
      id: number;
      usuario: string;
      nome: string;
    };
    usuarioUpdate: string | null;
  };
}
