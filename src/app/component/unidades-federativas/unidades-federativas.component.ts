import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { UnidadeFederativa } from 'src/app/model/unidadeFederativa.model';
import { UnidadesFederativas } from 'src/app/model/unidadesFederativas.model';
import { UnidadesFederativasService } from 'src/app/service/unidades-federativas.service';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';

@Component({
  selector: 'app-unidades-federativas',
  templateUrl: './unidades-federativas.component.html',
  styleUrls: ['./unidades-federativas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    TranslateModule,
  ],
})
export class UnidadesFederativasComponent implements AfterViewInit {
  unidadesFederativas = new MatTableDataSource<UnidadeFederativa>([]);
  totalUfs = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nome', 'sigla'];

  constructor(
    private unidadesFederativasService: UnidadesFederativasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private paginatorIntl: MatPaginatorIntl,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.unidadesFederativas.paginator = this.paginator;
      this.unidadesFederativas.sort = this.sort;

      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.loadUnidadesFederativas();
        });

      this.loadUnidadesFederativas();
    }
  }

  loadUnidadesFederativas(params: { nome?: string; sigla?: string } = {}) {
    const offset = this.pageIndex * this.pageSize;
    const requestParams = {
      ...params,
      limit: this.pageSize,
      offset: offset,
    };

    this.unidadesFederativasService
      .getUnidadesFederativas(requestParams)
      .subscribe({
        next: (response: UnidadesFederativas) => {
          if (response && Array.isArray(response.ufs)) {
            this.unidadesFederativas.data = response.ufs;
            this.totalUfs = response.totalRecords || 0;

            if (this.paginator) {
              this.paginator.length = this.totalUfs;
              this.paginator.pageSize = this.pageSize;

              setTimeout(() => {
                this.paginator.pageIndex = this.pageIndex;
              });

              const start = offset + 1;
              const end = Math.min(start + this.pageSize - 1, this.totalUfs);

              if (this.paginatorIntl instanceof CustomPaginatorIntl) {
                this.paginatorIntl.setValues(start, end, this.totalUfs);
                this.paginatorIntl.emitChanges();
              }

              this.updatePaginationState();
            }
          }
        },
        error: (error) => {
          console.error('Erro ao carregar UFs:', error);
          this.snackBar.open('Erro ao carregar UFs', 'Fechar', {
            duration: 3000,
          });
        },
      });
  }

  private updatePaginationState(): void {
    const hasNextPage = (this.pageIndex + 1) * this.pageSize < this.totalUfs;
    const hasPreviousPage = this.pageIndex > 0;

    Object.assign(this.paginator, {
      hasNextPage: () => hasNextPage,
      hasPreviousPage: () => hasPreviousPage,
    });
  }

  limparFiltros(
    nomeInput: HTMLInputElement,
    siglaInput: HTMLInputElement
  ): void {
    nomeInput.value = '';
    siglaInput.value = '';
    this.pageIndex = 0;
    this.loadUnidadesFederativas();
  }
}
