import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoParams } from 'src/app/model/produtoParams.model';
import { ProdutoResponseDTO } from 'src/app/model/produtoResponseDTO.model';
import { ProdutoService } from 'src/app/service/produto.service';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
  ],
})
export class ProdutosComponent implements OnInit, AfterViewInit {
  produtos = new MatTableDataSource<Produto>([]);
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

  loadProdutos(params: ProdutoParams = {}) {
    const offset = this.pageIndex * this.pageSize;
    const requestParams = {
      ...params,
      limit: this.pageSize,
      offset: offset,
    };

    this.produtoService.getProdutos(requestParams).subscribe({
      next: (response: ProdutoResponseDTO) => {
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
