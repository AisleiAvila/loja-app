import { Dimensoes } from './dimensoes.model';
export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  organizacaoId: number;
  dataCadastro?: string;
  status: 'ATIVO' | 'INATIVO';
  codigoBarras?: string;
  unidadeMedida: string;
  peso?: number;
  dimensoes?: Dimensoes;
}
