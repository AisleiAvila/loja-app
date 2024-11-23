import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, debounceTime, startWith } from 'rxjs/operators';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { MessageModalComponent } from '../../shared/components/modal/message-modal/message-modal.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('dataNascimentoInput') dataNascimentoInput!: ElementRef;
  @ViewChild('limitInput') limitInput!: ElementRef;

  usuarios = new MatTableDataSource<any>([]);

  totalUsuarios = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'nome',
    'email',
    'dataNascimento',
    'perfis',
    'acoes',
  ];

  constructor(
    private usuariosService: UsuariosService,
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    private paginatorIntl: MatPaginatorIntl,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Inicialize qualquer lógica necessária aqui
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort = this.sort;

      // Inscrever-se nos eventos de paginação
      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.loadUsuarios();
        });

      this.loadUsuarios();
    }
  }

  /**
   * Método responsável por carregar os usuarios.
   */
  loadUsuarios(
    params: {
      nome?: string;
      id?: number;
      email?: string;
      dataNascimento?: string;
      limit?: number;
      offset?: number;
      event?: PageEvent;
    } = {}
  ) {
    const offset = this.pageIndex * this.pageSize;
    const requestParams = {
      ...params,
      limit: this.pageSize,
      offset: offset,
    };

    this.usuariosService.getUsuarios(requestParams).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.usuarios)) {
          this.usuarios.data = response.usuarios;
          this.totalUsuarios = response.totalRecords || 0;

          if (this.paginator) {
            // Atualizar o paginator
            this.paginator.length = this.totalUsuarios;
            this.paginator.pageSize = this.pageSize;

            // Importante: Atualizar o pageIndex por último
            setTimeout(() => {
              this.paginator.pageIndex = this.pageIndex;
            });

            const start = offset + 1;
            const end = Math.min(start + this.pageSize - 1, this.totalUsuarios);

            if (this.paginatorIntl instanceof CustomPaginatorIntl) {
              this.paginatorIntl.setValues(start, end, this.totalUsuarios);
              this.paginatorIntl.emitChanges();
            }

            // Atualizar estado da paginação
            this.updatePaginationState();
          }
        } else {
          console.error('Formato de resposta inválido:', response);
          this.snackBar.open('Erro ao carregar dados', 'Fechar', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        this.snackBar.open(
          error.message || 'Erro ao carregar usuários',
          'Fechar',
          { duration: 3000 }
        );
      },
    });
  }

  private updatePaginationState(): void {
    // Atualizar a visibilidade dos botões de navegação
    const hasNextPage =
      (this.pageIndex + 1) * this.pageSize < this.totalUsuarios;
    const hasPreviousPage = this.pageIndex > 0;

    // Atualizar o estado do paginator
    Object.assign(this.paginator, {
      hasNextPage: () => hasNextPage,
      hasPreviousPage: () => hasPreviousPage,
    });
  }

  /**
   * Método responsável por cadastrar um usuário.
   */
  navigateToCadastroUsuario() {
    this.router.navigate(['/cadastro-usuario'], {
      state: { acao: 'Cadastrar' },
    });
  }

  /**
   * Método responsável por abrir o modal.
   */
  abrirModal(message: string, type: string): void {
    const modalRef = this.modalService.open(MessageModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
  }

  cadastroUsuario(id: number, acao: string): void {
    this.usuariosService.getUsuarios({ id }).subscribe(
      (usuario) => {
        this.router.navigate(['/cadastro-usuario', id], {
          state: { usuario, acao: acao },
        });
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
        this.abrirModal('Erro ao carregar usuário', 'error');
      }
    );
  }

  excluirUsuario(id: number): void {
    this.usuariosService.deleteUsuario({ id }).subscribe(
      () => {
        this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        } as MatSnackBarConfig);
        this.loadUsuarios();
      },
      (error) => {
        console.error('Erro ao excluir usuário:', error);
        this.abrirModal('Erro ao excluir usuário' + error, 'error');
      }
    );
  }

  onDateInput(event: MatDatepickerInputEvent<Date>) {
    const inputDate = event.value;
    // Lógica adicional para lidar com a data de entrada, se necessário
  }

  /**
   * Método responsável por limpar os filtros e recarregar os usuários.
   */
  limparFiltros(
    nomeInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    dataNascimentoInput: HTMLInputElement
  ): void {
    nomeInput.value = '';
    emailInput.value = '';
    dataNascimentoInput.value = '';
    this.pageIndex = 0;
    this.loadUsuarios();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
