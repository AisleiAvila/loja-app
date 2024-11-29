import { formatDate, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { OrganizacoesService } from 'src/app/service/organizacoes.service';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { CharCountService } from 'src/app/shared/service/char-count.service';
import { UtilService } from 'src/app/shared/service/util.service';

@Component({
  selector: 'app-cadastro-organizacao',
  templateUrl: './cadastro-organizacao.component.html',
  styleUrl: './cadastro-organizacao.component.scss',
})
export class CadastroOrganizacaoComponent {
  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  titulo: string = '';
  acao: string = '';

  id: number = 0;
  nome: string = '';
  nif: string = '';
  email: string = '';
  website: string = '';
  setorAtividade: string = '';
  missao: string = '';
  representanteLegal: string = '';
  cargo: string = '';
  numeroRegistoComercial: string = '';
  dataRegisto: string = '';

  // Variáveis de estado para armazenar mensagens de erro
  nomeErro: string = '';
  nifErro: string = '';
  emailErro: string = '';
  websiteErro: string = '';
  setorAtividadeErro: string = '';
  missaoErro: string = '';
  representanteLegalErro: string = '';
  cargoErro: string = '';
  numeroRegistoComercialErro: string = '';
  dataRegistoErro: string = '';

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
      alert(this.nomeErro);
      isValid = false;
    }

    if (!this.nif?.trim()) {
      this.nifErro = this.translate.instant('LABLE_NIF_OBRIGATORIO');
      alert(this.nifErro);
      isValid = false;
    }

    if (!this.email?.trim() && !this.utilService.validarEmail(this.email)) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_INVALIDO');
      alert(this.emailErro);
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
    alert('organizacao: ' + JSON.stringify(organizacao));

    if (this.acao === 'Alterar') {
      this.organizacoesService.updateOrganizacao(organizacao).subscribe(
        (response) => {
          this.snackBar.open('Usuário atualizado com sucesso', 'Fechar', {
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
        (response) => {
          this.snackBar.open('Organização criada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          } as MatSnackBarConfig);
          this.router.navigate(['/organizacao']);
        },
        (error) => {
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

  private formatarErro(error: any): string {
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

  private preencherFormulario(jsonData: any): void {
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
      const organizacao = history.state.organizacao || undefined;
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
        this.email = ''; // Limpa o campo de e-mail ao iniciar a tela de cadastramento
      }
    });
  }

  private criarOrganizacao(): any {
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
