import { CommonModule, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiError } from 'src/app/model/apiError.model';
import { Organizacao } from 'src/app/model/organizacao.model';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { OrganizacoesService } from 'src/app/service/organizacoes.service';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { CharCountService } from 'src/app/shared/service/char-count.service';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-cadastro-organizacao',
  templateUrl: './cadastro-organizacao.component.html',
  styleUrl: './cadastro-organizacao.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    TranslateModule,
  ],
})
export class CadastroOrganizacaoComponent implements OnInit {
  isEditMode = false;
  isCreateMode = false;
  titulo = '';
  acao = '';

  id = 0;
  nome = '';
  nif = '';
  email = '';
  website = '';
  setorAtividade = '';
  missao = '';
  representanteLegal = '';
  cargo = '';
  numeroRegistoComercial = '';
  dataRegisto = '';

  // Variáveis de estado para armazenar mensagens de erro
  nomeErro = '';
  nifErro = '';
  emailErro = '';
  websiteErro = '';
  setorAtividadeErro = '';
  missaoErro = '';
  representanteLegalErro = '';
  cargoErro = '';
  numeroRegistoComercialErro = '';
  dataRegistoErro = '';

  constructor(
    private route: ActivatedRoute,
    private organizacoesService: OrganizacoesService,
    private location: Location,
    private modalCommunicationService: ModalCommunicationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private charCountService: CharCountService,
    private utilService: UtilService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  onInputChange(inputId: string, charCountId: string, maxLength: number): void {
    this.charCountService.updateCharCount(inputId, charCountId, maxLength);
  }

  validarCampos(): boolean {
    // Resetar todas as mensagens de erro
    this.resetarErros();

    let isValid = true;

    // Validar cada campo individualmente
    if (!this.nome?.trim()) {
      this.nomeErro = this.translate.instant('LABLE_NOME_OBRIGATORIO');
      isValid = false;
    }

    if (!this.nif?.trim()) {
      this.nifErro = this.translate.instant('LABLE_NIF_OBRIGATORIO');
      isValid = false;
    }

    if (!this.email?.trim() && !this.utilService.validarEmail(this.email)) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_INVALIDO');
      isValid = false;
    }

    // Se houver campos inválidos, exibir snackbar com mensagem
    if (!isValid) {
      this.snackBar.open(
        this.translate.instant('LABLE_CAMPOS_OBRIGATORIOS'),
        this.translate.instant('LABLE_FECHAR'),
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar'],
        }
      );
    }

    return isValid;
  }

  private resetarErros(): void {
    this.nomeErro = '';
    this.emailErro = '';
    this.websiteErro = '';
    this.setorAtividadeErro = '';
    this.missaoErro = '';
    this.representanteLegalErro = '';
    this.cargoErro = '';
    this.numeroRegistoComercialErro = '';
    this.dataRegistoErro = '';
  }

  salvarOrganizacao() {
    // Validar todos os campos antes de salvar
    if (!this.validarCampos()) {
      // Rolar a página até o primeiro campo com erro
      const firstErrorField = document.querySelector('.mat-form-field-invalid');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const organizacao = this.criarOrganizacao();

    if (this.acao === 'Alterar') {
      this.organizacoesService.updateOrganizacao(organizacao).subscribe(
        () => {
          this.snackBar.open('Organização atualizada com sucesso', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          } as MatSnackBarConfig);
          this.router.navigate(['/organizacao']);
        },
        (error) => {
          this.modalCommunicationService.abrirModal(
            'Erro ao atualizar organização\n' + this.formatarErro(error),
            'error'
          );
        }
      );
    } else {
      this.organizacoesService.saveOrganizacao(organizacao).subscribe(
        () => {
          this.snackBar.open('Organização criada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          } as MatSnackBarConfig);
          this.router.navigate(['/organizacao']);
        },
        (error) => {
          console.error('Erro ao criar organização:', error);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message:
                'Erro ao criar organização!<br>E-mail utilizado por outro usuário.',
            },
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-multiline'],
          });
        }
      );
    }
  }

  cancelar() {
    this.location.back();
  }

  private formatarErro(error: ApiError): string {
    // Formate a mensagem de erro conforme necessário
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'Ocorreu um erro desconhecido';
    }
  }

  private definirTitulo(acao: string | undefined): void {
    this.isEditMode = true;
    let titleKey = '';

    if (acao === 'Alterar') {
      titleKey = 'TITLE_ALTERAR_ORGANIZACAO';
    } else if (acao === 'Cadastrar') {
      titleKey = 'TITLE_CADASTRAR_ORGANIZACAO';
    } else {
      titleKey = 'TITLE_DETALHAR_ORGANIZACAO';
      this.isEditMode = false;
    }

    // Inscrever-se nas mudanças de idioma
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(titleKey).subscribe((traducao: string) => {
        this.titulo = traducao;
      });
    });

    // Definir título inicial
    this.translate.get(titleKey).subscribe((traducao: string) => {
      this.titulo = traducao;
    });
  }

  private preencherFormulario(jsonData: Organizacao | string): void {
    let data;
    if (typeof jsonData === 'string') {
      try {
        data = JSON.parse(jsonData);
      } catch (e) {
        console.error('Erro ao parsear JSON:', e);
        return;
      }
    } else {
      data = jsonData;
    }

    const organizacao = data.organizacoes[0];

    this.id = organizacao.id;
    this.nome = organizacao.nome;
    this.nif = organizacao.nif;
    this.email = organizacao.email;
    this.website = organizacao.website;
    this.setorAtividade = organizacao.setorAtividade;
    this.missao = organizacao.missao;
    this.representanteLegal = organizacao.representanteLegal;
    this.cargo = organizacao.cargo;
    this.numeroRegistoComercial = organizacao.numeroRegistoComercial;
    this.dataRegisto = organizacao.dataRegisto;
    this.email = organizacao.email;
    this.validarCampos();
  }

  private initializeComponent() {
    this.route.paramMap.subscribe((params) => {
      this.acao = history.state.acao || '';
      const id = params.get('id');

      if (this.acao) {
        this.definirTitulo(this.acao);
      } else {
        this.definirTitulo(undefined);
      }

      if (id) {
        this.isCreateMode = false;
        this.organizacoesService
          .getOrganizacaoById(+id)
          .subscribe((organizacao) => {
            this.preencherFormulario(organizacao);
          });
      } else {
        this.isCreateMode = true;
        this.email = '';
      }
    });
  }

  private criarOrganizacao(): Organizacao {
    const organizacao = {
      id: this.id,
      nome: this.nome,
      nif: this.nif,
      email: this.email,
      website: this.website,
      setorAtividade: this.setorAtividade,
      missao: this.missao,
      representanteLegal: this.representanteLegal,
      cargo: this.cargo,
      numeroRegistoComercial: this.numeroRegistoComercial,
      dataRegisto: this.dataRegisto
        ? formatDate(this.dataRegisto, 'yyyy-MM-dd', 'en-US')
        : null,
    };

    return organizacao;
  }
}
