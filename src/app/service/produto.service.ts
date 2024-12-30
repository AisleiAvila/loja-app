import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Produto } from '../model/produto.model';
import { ProdutoParams } from '../model/produtoParams.model';
import { ProdutoResponseDTO } from '../model/produtoResponseDTO.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Notebook Pro X1',
      descricao: 'Notebook de alta performance',
      preco: 4999.99,
      quantidade: 50,
      categoria: 'Eletrônicos',
      organizacaoId: 1,
      dataCadastro: '2024-03-15',
      status: 'ATIVO',
      codigoBarras: '789012345678',
      unidadeMedida: 'UN',
      peso: 2.5,
      dimensoes: {
        altura: 1.5,
        largura: 35.0,
        profundidade: 25.0,
      },
    },
    {
      id: 2,
      nome: 'Smartphone Galaxy X',
      descricao: 'Smartphone última geração',
      preco: 2999.99,
      quantidade: 100,
      categoria: 'Eletrônicos',
      organizacaoId: 1,
      dataCadastro: '2024-03-14',
      status: 'ATIVO',
      codigoBarras: '789012345679',
      unidadeMedida: 'UN',
      peso: 0.2,
      dimensoes: {
        altura: 15.0,
        largura: 7.5,
        profundidade: 0.8,
      },
    },
  ];

  getProdutos(params: ProdutoParams = {}): Observable<ProdutoResponseDTO> {
    let produtos = [...this.produtos];

    // Aplicar filtros
    if (params.nome) {
      produtos = produtos.filter((p) =>
        p.nome.toLowerCase().includes(params.nome.toLowerCase())
      );
    }
    if (params.categoria) {
      produtos = produtos.filter((p) =>
        p.categoria.toLowerCase().includes(params.categoria.toLowerCase())
      );
    }

    // Calcular paginação
    const total = produtos.length;
    const inicio = params.offset || 0;
    const fim = inicio + (params.limit || 10);

    return of({
      produtos: produtos.slice(inicio, fim),
      totalRecords: total,
    }).pipe(delay(500)); // Simular delay de rede
  }

  getProdutoById(id: number): Observable<ProdutoResponseDTO> {
    const produto = this.produtos.find((p) => p.id === id);
    return of({
      produtos: produto ? [produto] : [],
      totalRecords: produto ? 1 : 0,
    }).pipe(delay(300));
  }

  saveProduto(produto: Produto): Observable<Produto> {
    const novoProduto = {
      ...produto,
      id: this.produtos.length + 1,
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    this.produtos.push(novoProduto);
    return of(novoProduto).pipe(delay(300));
  }

  updateProduto(produto: Produto): Observable<Produto> {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index >= 0) {
      this.produtos[index] = { ...this.produtos[index], ...produto };
      return of(this.produtos[index]).pipe(delay(300));
    }
    return of(null).pipe(delay(300));
  }

  deleteProduto(id: number): Observable<Produto | null> {
    const index = this.produtos.findIndex((p) => p.id === id);
    let deletedProduto: Produto | null = null;
    if (index >= 0) {
      deletedProduto = this.produtos.splice(index, 1)[0];
    }
    return of(deletedProduto).pipe(delay(300));
  }
}
