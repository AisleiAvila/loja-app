import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioResponseDTO } from 'src/app/model/usuarioResponseDTO.model';
import { UsuariosService } from 'src/app/service/usuarios.service';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { MessageModalComponent } from '../../shared/components/modal/message-modal/message-modal.component';
import { Perfil } from '../../model/perfil.model';
import { PerfisService } from '../../service/perfis.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    TranslateModule,
    NgbModalModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosComponent implements AfterViewInit, OnInit {
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('dataNascimentoInput') dataNascimentoInput!: ElementRef;
  @ViewChild('limitInput') limitInput!: ElementRef;

  usuarios = new MatTableDataSource<Usuario>([]);

  options: Perfil[];

  selectedOptions: Perfil[];

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
    private translate: TranslateService,
    private perfisService: PerfisService
  ) {}

  ngOnInit(): void {
    this.perfisService.getPerfis().subscribe((perfis) => {
      this.options = perfis.map((perfil) => ({
        id: perfil.id,
        nome: perfil.nome,
        selected: false,
      }));
    });
  }

  ngAfterViewInit(): void {
    this.selectedOptions = (this.options ?? []).filter(
      (option) => option.selected
    );

    if (this.paginator) {
      this.usuarios.paginator = this.paginator;
      this.usuarios.sort = this.sort;

      // Inscrever-se nos eventos de paginação
      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.applyFilters();
          // this.loadUsuarios();
        });

      this.applyFilters();
      // this.loadUsuarios();
    }
  }

  loadUsuarios(
    params: {
      nome?: string;
      id?: number;
      email?: string;
      dataNascimento?: string;
      perfis?: number[];
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
      next: (response: UsuarioResponseDTO) => {
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
    const hasNextPage =
      (this.pageIndex + 1) * this.pageSize < this.totalUsuarios;
    const hasPreviousPage = this.pageIndex > 0;

    Object.assign(this.paginator, {
      hasNextPage: () => hasNextPage,
      hasPreviousPage: () => hasPreviousPage,
    });
  }

  navigateToCadastroUsuario() {
    this.router.navigate(['/cadastro-usuario'], {
      state: { acao: 'Cadastrar' },
    });
  }

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
    console.log('Data de entrada:', event.value);
    // Lógica adicional para lidar com a data de entrada, se necessário
  }

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

  // Função para atualizar a seleção
  toggleSelection(option: Perfil) {
    option.selected = !option.selected;
    this.selectedOptions = this.options.filter((option) => option.selected);
  }

  // Função para chamar loadUsuarios com os filtros
  applyFilters() {
    const filters = {
      nome: this.nomeInput.nativeElement.value,
      email: this.emailInput.nativeElement.value,
      dataNascimento: this.dataNascimentoInput.nativeElement.value,
      perfis: (this.selectedOptions ?? []).map((option) => option.id),
    };
    this.loadUsuarios(filters);
  }
}
