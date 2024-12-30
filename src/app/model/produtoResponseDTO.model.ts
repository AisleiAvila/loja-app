import { Produto } from './produto.model';

export interface ProdutoResponseDTO {
  produtos: Produto[];
  totalRecords: number;
}
