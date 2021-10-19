export interface ChecklistAnswer {
  id: number;
  situacao: string;
  dth_resposta: string | undefined;
  createdAt: string;
  updatedAt: string | undefined;
  checklistId: number;
  plantaId: number;
  ocorrenciaId: number | undefined;
  usuarioCreateId: number | undefined;
  usuarioUpdateId: number | undefined;
}
