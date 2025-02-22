import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { Cidade } from 'src/app/model/cidade.model';
import { Estado } from 'src/app/model/estado.model';
import { Organizacao } from 'src/app/model/organizacao.model';
import { Organizacoes } from 'src/app/model/organizacoes.model';
import { Pais } from 'src/app/model/pais.model';
import { OrganizacoesService } from 'src/app/service/organizacoes.service';
import { MessageModalComponent } from 'src/app/shared/components/modal/message-modal/message-modal.component';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { EstadoService } from '../../service/estado.service';
import { ModalCommunicationService } from '../../service/modal-communication.service';

@Component({
  selector: 'app-organizacao',
  templateUrl: './organizacao.component.html',
  styleUrls: ['./organizacao.component.scss'],
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
    NgbModalModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class OrganizacaoComponent implements AfterViewInit, OnInit {
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('nifInput') nifInput!: ElementRef;
  @ViewChild('limitInput') limitInput!: ElementRef;

  organizacoes = new MatTableDataSource<Organizacao>([]);

  totalOrganizacoes = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'nome',
    'nif',
    'email',
    'website',
    'setorAtividade',
    'acoes',
  ];

  form: FormGroup;
  paises: Pais[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  constructor(
    // private usuariosService: UsuariosService,
    private organizacoesService: OrganizacoesService,
    private modalService: NgbModal,
    private router: Router,
    private snackBar: MatSnackBar,
    private paginatorIntl: MatPaginatorIntl,
    private translate: TranslateService,
    private fb: FormBuilder,
    private estadoService: EstadoService,
    private modalCommunicationService: ModalCommunicationService
  ) {
    this.form = this.fb.group({
      paisId: ['', Validators.required],
      estadoId: ['', Validators.required],
      cidadeId: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.organizacoes.paginator = this.paginator;
      this.organizacoes.sort = this.sort;

      // Inscrever-se nos eventos de paginação
      this.paginator.page
        .pipe(debounceTime(300))
        .subscribe((event: PageEvent) => {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.loadOrganizacoes();
        });

      this.loadOrganizacoes();
    }
  }

  ngOnInit(): void {
    this.carregarPaises();
    this.getEstados(1); // Chame a função getEstados com um ID de exemplo
  }

  carregarPaises(): void {
    // Implementar o carregamento de países
    this.paises = [
      { id: 1, nome: 'Brasil' },
      { id: 2, nome: 'Portugal' },
    ];
  }

  onPaisSelected(paisId: number): void {
    console.log('País selecionado:', paisId); // Debug log
    if (paisId) {
      this.getEstados(paisId);
    } else {
      this.estados = [];
      this.cidades = [];
      this.form.patchValue({
        estadoId: '',
        cidadeId: '',
      });
    }
  }

  getEstados(paisId: number): void {
    this.estadoService.getEstadosByPaisId(paisId).subscribe({
      next: (estados) => {
        this.estados = estados;
        this.cidades = []; // Limpa as cidades quando um novo estado é selecionado
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
        this.modalCommunicationService.abrirModal(
          'Erro ao carregar estados',
          'Erro'
        );
      },
    });
  }

  /**
   * Método responsável por carregar os usuarios.
   */
  loadOrganizacoes(
    params: {
      nome?: string;
      id?: number;
      nif?: string;
      email?: string;
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

    this.organizacoesService.getOrganizacoes(requestParams).subscribe({
      next: (response: Organizacoes) => {
        if (response && Array.isArray(response.organizacoes)) {
          this.organizacoes.data = response.organizacoes;
          this.totalOrganizacoes = response.totalRecords || 0;

          if (this.paginator) {
            // Atualizar o paginator
            this.paginator.length = this.totalOrganizacoes;
            this.paginator.pageSize = this.pageSize;

            // Importante: Atualizar o pageIndex por último
            setTimeout(() => {
              this.paginator.pageIndex = this.pageIndex;
            });

            const start = offset + 1;
            const end = Math.min(
              start + this.pageSize - 1,
              this.totalOrganizacoes
            );

            if (this.paginatorIntl instanceof CustomPaginatorIntl) {
              this.paginatorIntl.setValues(start, end, this.totalOrganizacoes);
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
      (this.pageIndex + 1) * this.pageSize < this.totalOrganizacoes;
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
    this.router.navigate(['/cadastro-organizacao'], {
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
    this.organizacoesService.getOrganizacoes({ id }).subscribe(
      (usuario) => {
        this.router.navigate(['/cadastro-organizacao', id], {
          state: { usuario, acao: acao },
        });
      },
      (error) => {
        console.error('Erro ao carregar organização:', error);
        this.abrirModal('Erro ao carregar organização', 'error');
      }
    );
  }

  excluirUsuario(id: number): void {
    this.organizacoesService.deleteOrganizacao({ id }).subscribe(
      () => {
        this.snackBar.open('Organização excluído com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        } as MatSnackBarConfig);
        this.loadOrganizacoes();
      },
      (error) => {
        console.error('Erro ao excluir organização:', error);
        this.abrirModal('Erro ao excluir organização' + error, 'error');
      }
    );
  }

  // onDateInput(event: MatDatepickerInputEvent<Date>) {
  //   const inputDate = event.value;
  //   // Lógica adicional para lidar com a data de entrada, se necessário
  // }

  /**
   * Método responsável por limpar os filtros e recarregar os usuários.
   */
  limparFiltros(
    nomeInput: HTMLInputElement,
    nifInput: HTMLInputElement,
    emailInput: HTMLInputElement
  ): void {
    nomeInput.value = '';
    nifInput.value = '';
    emailInput.value = '';
    this.pageIndex = 0;
    this.loadOrganizacoes();
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
