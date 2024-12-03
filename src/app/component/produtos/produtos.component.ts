import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ProdutoService } from 'src/app/service/produto.service';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos = new MatTableDataSource<any>([]);
  totalProdutos = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'nome',
    'categoria',
    'preco',
    'quantidade',
    'status',
    'acoes',
  ];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private paginatorIntl: MatPaginatorIntl,
    private translate: TranslateService,
    private location: Location
  ) {
    console.log('ProdutosComponent construtor');
    console.log('URL atual:', this.location.path());
  }

  ngOnInit(): void {
    console.log('ProdutosComponent ngOnInit');
    console.log('URL atual:', this.location.path());
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.produtos.paginator = this.paginator;
      this.produtos.sort = this.sort;

      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.loadProdutos();
        });

      this.loadProdutos();
    }
  }

  loadProdutos(params: any = {}) {
    const offset = this.pageIndex * this.pageSize;
    const requestParams = {
      ...params,
      limit: this.pageSize,
      offset: offset,
    };

    this.produtoService.getProdutos(requestParams).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.produtos)) {
          this.produtos.data = response.produtos;
          this.totalProdutos = response.totalRecords || 0;

          if (this.paginator) {
            this.paginator.length = this.totalProdutos;
            this.paginator.pageSize = this.pageSize;

            setTimeout(() => {
              this.paginator.pageIndex = this.pageIndex;
            });

            const start = offset + 1;
            const end = Math.min(start + this.pageSize - 1, this.totalProdutos);

            if (this.paginatorIntl instanceof CustomPaginatorIntl) {
              this.paginatorIntl.setValues(start, end, this.totalProdutos);
              this.paginatorIntl.emitChanges();
            }

            this.updatePaginationState();
          }
        }
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  private updatePaginationState(): void {
    const hasNextPage =
      (this.pageIndex + 1) * this.pageSize < this.totalProdutos;
    const hasPreviousPage = this.pageIndex > 0;

    Object.assign(this.paginator, {
      hasNextPage: () => hasNextPage,
      hasPreviousPage: () => hasPreviousPage,
    });
  }

  navigateToCadastroProduto() {
    this.router.navigate(['/produtos/cadastro-produto'], {
      state: { acao: 'Cadastrar' },
    });
  }

  cadastroProduto(id: number, acao: string): void {
    this.router.navigate(['/produtos/cadastro-produto', id], {
      state: { acao: acao },
    });
  }

  excluirProduto(id: number): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe({
        next: () => {
          this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.loadProdutos();
        },
        error: (error) => {
          console.error('Erro ao excluir produto:', error);
          this.snackBar.open('Erro ao excluir produto', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  limparFiltros(
    nomeInput: HTMLInputElement,
    categoriaInput: HTMLInputElement
  ): void {
    nomeInput.value = '';
    categoriaInput.value = '';
    this.pageIndex = 0;
    this.loadProdutos();
  }
}
