import { Location } from '@angular/common';
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

  // lstPerfis: any[] = []; // Certifique-se de que lstPerfis é um array
  // lstUfs: any[] = []; // Certifique-se de que lstUfs é um array
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
  // senha: string = '';
  // reSenha: string = '';
  // dataNascimento: string = '';
  emailOrganizacaoInput: string = '';
  // perfil: any = {};
  // perfilSelecionadoId: number;
  // perfilSelecionado: number;
  // ufId: number;
  // confirmarSenha: string = '';
  // endereco: any = {
  //   logradouro: '',
  //   numero: '',
  //   complemento: '',
  //   bairro: '',
  //   cidade: '',
  //   uf: {
  //     id: 0,
  //     nome: '',
  //     sigla: '',
  //   },
  //   cep: '',
  // };

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
  // dataNascimentoErro: string = '';
  // emailErro: string = '';
  // perfilErro: string = '';
  // senhaErro: string = '';
  // confirmarSenhaErro: string = '';
  // logradouroErro: string = '';
  // numeroErro: string = '';
  // bairroErro: string = '';
  // cidadeErro: string = '';
  // ufErro: string = '';
  // cepErro: string = '';

  constructor(
    private route: ActivatedRoute,
    private organizacoesService: OrganizacoesService,
    // private perfisService: PerfisService,
    private location: Location,
    private modalCommunicationService: ModalCommunicationService,
    private snackBar: MatSnackBar,
    private router: Router,
    // private unidadesFederativasService: UnidadesFederativasService,
    private charCountService: CharCountService,
    private utilService: UtilService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Usar forkJoin para garantir que initializeComponent seja chamado após getPerfis e getUfs
    // forkJoin([this.getPerfis(), this.getUfs()]).subscribe(() => {
    this.initializeComponent();
    // });
  }

  onInputChange(inputId: string, charCountId: string, maxLength: number): void {
    this.charCountService.updateCharCount(inputId, charCountId, maxLength);
  }

  // getPerfis() {
  //   return this.perfisService.getPerfis().pipe(
  //     tap((perfis) => {
  //       this.lstPerfis = Array.isArray(perfis) ? perfis : []; // Certifique-se de que perfis é um array
  //     })
  //   );
  // }

  // getUfs() {
  //   return this.unidadesFederativasService.getUnidadesFederativas({}).pipe(
  //     tap((response: any) => {
  //       // Verifique se response é um objeto e tem a propriedade ufs
  //       if (response && Array.isArray(response.ufs)) {
  //         this.lstUfs = response.ufs;
  //       } else {
  //         this.lstUfs = [];
  //       }
  //       console.log('Unidades Federativas:', this.lstUfs); // Verificação
  //     })
  //   );
  // }

  validarCampos(): boolean {
    // Resetar todas as mensagens de erro
    this.resetarErros();

    let isValid = true;

    // Validar cada campo individualmente
    if (!this.nome?.trim()) {
      this.nomeErro = this.translate.instant('LABLE_NOME_OBRIGATORIO');
      isValid = false;
    }

    if (!this.emailOrganizacaoInput?.trim()) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_OBRIGATORIO');
      isValid = false;
    } else if (!this.utilService.validarEmail(this.emailOrganizacaoInput)) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_INVALIDO');
      isValid = false;
    }

    // if (!this.dataNascimento) {
    //   this.dataNascimentoErro = this.translate.instant(
    //     'LABLE_DATA_NASCIMENTO_OBRIGATORIA'
    //   );
    //   isValid = false;
    // }

    // if (!this.perfilSelecionadoId) {
    //   this.perfilErro = this.translate.instant('LABLE_PERFIL_OBRIGATORIO');
    //   isValid = false;
    // }

    if (this.isCreateMode) {
      // if (!this.senha?.trim()) {
      //   this.senhaErro = this.translate.instant('LABLE_SENHA_OBRIGATORIA');
      //   isValid = false;
      // }
      // if (!this.confirmarSenha?.trim()) {
      //   this.confirmarSenhaErro = this.translate.instant(
      //     'LABLE_CONFIRMAR_SENHA_OBRIGATORIA'
      //   );
      //   isValid = false;
      // }
      // if (this.senha !== this.confirmarSenha) {
      //   this.confirmarSenhaErro = this.translate.instant(
      //     'LABLE_SENHAS_DIFERENTES'
      //   );
      //   isValid = false;
      // }
    }

    // // Validar campos de endereço
    // if (!this.endereco.logradouro?.trim()) {
    //   this.logradouroErro = this.translate.instant(
    //     'LABLE_LOGRADOURO_OBRIGATORIO'
    //   );
    //   isValid = false;
    // }

    // if (!this.endereco.numero?.trim()) {
    //   this.numeroErro = this.translate.instant('LABLE_NUMERO_OBRIGATORIO');
    //   isValid = false;
    // }

    // if (!this.endereco.bairro?.trim()) {
    //   this.bairroErro = this.translate.instant('LABLE_BAIRRO_OBRIGATORIO');
    //   isValid = false;
    // }

    // if (!this.endereco.cidade?.trim()) {
    //   this.cidadeErro = this.translate.instant('LABLE_CIDADE_OBRIGATORIA');
    //   isValid = false;
    // }

    // if (!this.ufId) {
    //   this.ufErro = this.translate.instant('LABLE_UF_OBRIGATORIA');
    //   isValid = false;
    // }

    // if (!this.endereco.cep?.trim()) {
    //   this.cepErro = this.translate.instant('LABLE_CEP_OBRIGATORIO');
    //   isValid = false;
    // }

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
    // this.dataNascimentoErro = '';
    // this.perfilErro = '';
    // this.senhaErro = '';
    // this.confirmarSenhaErro = '';
    // this.logradouroErro = '';
    // this.numeroErro = '';
    // this.bairroErro = '';
    // this.cidadeErro = '';
    // this.ufErro = '';
    // this.cepErro = '';
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
    // this.dataNascimento = usuario.dataNascimento;
    this.emailOrganizacaoInput = organizacao.email;
    // this.perfilSelecionadoId =
    //   usuario.perfis.length > 0 ? usuario.perfis[0].id : null;
    // if (usuario.enderecos && usuario.enderecos.length > 0) {
    //   this.endereco = usuario.enderecos[0];
    //   this.ufId = this.endereco.uf.id;
    // }
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
            alert(JSON.stringify(organizacao));
            this.preencherFormulario(organizacao);
          });
      } else {
        this.isCreateMode = true;
        this.emailOrganizacaoInput = ''; // Limpa o campo de e-mail ao iniciar a tela de cadastramento
      }
    });
  }

  private criarOrganizacao(): any {
    // // Encontrar o perfil selecionado
    // const perfilSelecionado = this.lstPerfis.find((perfil) => {
    //   return Number(perfil.id) === Number(this.perfilSelecionadoId);
    // });

    // // Encontrar a UF selecionada
    // const ufSelecionada = this.lstUfs.find((uf) => {
    //   return Number(uf.id) === Number(this.ufId);
    // });

    // const perfis = perfilSelecionado
    //   ? [
    //       {
    //         id: this.perfilSelecionadoId,
    //         nome: perfilSelecionado.nome,
    //       },
    //     ]
    //   : [];

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
      dataRegisto: this.dataRegisto,
      // dataNascimento: this.dataNascimento,
      // email: this.emailUsuarioInput,
      // senha: this.senha,
      // perfis: perfis,
      // enderecos: [
      //   {
      //     id: this.endereco.id,
      //     logradouro: this.endereco.logradouro,
      //     numero: this.endereco.numero,
      //     complemento: this.endereco.complemento,
      //     bairro: this.endereco.bairro,
      //     cidade: this.endereco.cidade,
      // uf: ufSelecionada
      //   ? {
      //       id: ufSelecionada.id,
      //       nome: ufSelecionada.nome,
      //       sigla: ufSelecionada.sigla,
      //     }
      //   : null,
      //   cep: this.endereco.cep,
      // },
      // ],
    };

    return organizacao;
  }
}
