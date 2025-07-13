export interface Equipamento {
  id: number;
  nome: string;
  modelo?: string;
  numeroSerie?: string;
  ativo: boolean;
  falha: boolean;
  id_local: number;
  responsavelId?: number;
  createdAt?: string;
  updatedAt?: string;
}
