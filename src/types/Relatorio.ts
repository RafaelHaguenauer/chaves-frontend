export interface Relatorio {
  id: number;
  titulo: string;
  tipo: string;
  descricao?: string;
  conteudo?: string; 
  dataCriacao: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}
