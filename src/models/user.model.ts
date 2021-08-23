export interface User {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  senha: string;
  dataUltimoAcessoApp: Date;
  ativo: number;
  tipo: number;
  role?: Array<string>;
  createdAt: string;
  updatedAt: string;
  usuarioCreateId: number;
  usuarioUpdateId: number;
}
