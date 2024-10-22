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
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions: number[] = [3, 5, 10, 20];

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
    private paginatorIntl: MatPaginatorIntl // Injetar MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    // Inicialize qualquer lógica necessária aqui
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort = this.sort;
      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          console.log('Evento de paginação:', event);
          this.loadUsuarios({ event });
        });
      this.loadUsuarios();
    } else {
      console.error('Paginator não está definido em ngAfterViewInit');
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
    if (!this.paginator) {
      console.error('Paginator não está definido');
      return;
    }

    if (params.event) {
      this.pageIndex = params.event.pageIndex;
      this.pageSize = params.event.pageSize;
    }

    const requestParams = {
      ...params,
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize,
    };

    this.usuariosService
      .getUsuarios(requestParams)
      .pipe(
        catchError((error) => {
          const statusCode = error.status || 'Unknown status code';
          const errorMessage = `Error ${statusCode}: ${
            error.error.error || 'Error occurred while fetching Usuarios'
          }`;
          if (statusCode === 401) {
            this.abrirModal(errorMessage, 'error');
            window.location.href = '/login';
          }
          return [];
        }),
        startWith([])
      )
      .subscribe((data) => {
        this.usuarios.data = data.usuarios || [];
        if (data.totalRecords !== undefined && this.pageIndex === 0) {
          this.totalUsuarios = data.totalRecords;
          this.paginator.length = this.totalUsuarios; // Atualiza o length do paginator
        }

        // Calcule o início e fim dos registros exibidos
        const start = this.pageIndex * this.pageSize + 1;
        const end = Math.min(start + this.pageSize - 1, this.totalUsuarios);

        // Emitir mudanças para atualizar o paginator
        if (this.paginatorIntl instanceof CustomPaginatorIntl) {
          try {
            this.paginatorIntl.setValues(start, end, this.totalUsuarios);
            this.paginatorIntl.emitChanges();
          } catch (error) {
            console.error('Erro ao emitir mudanças no paginator:', error);
          }
        } else {
          console.error(
            'paginatorIntl não é uma instância de CustomPaginatorIntl'
          );
        }
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
}
