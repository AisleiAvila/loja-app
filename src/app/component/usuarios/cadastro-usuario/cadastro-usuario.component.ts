import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { PerfisService } from 'src/app/service/perfis.service';
import { UnidadesFederativasService } from 'src/app/service/unidades-federativas.service';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { UsuariosService } from '../../../service/usuarios.service';
import { CharCountService } from '../../../shared/service/char-count.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  isEditMode: boolean = false;
  isCreateMode: boolean = false;
  titulo: string = 'Cadastrar Usuário';
  acao: string = '';

  lstPerfis: any[] = []; // Certifique-se de que lstPerfis é um array
  lstUfs: any[] = []; // Certifique-se de que lstUfs é um array
  id: number = 0;
  nome: string = '';
  senha: string = '';
  reSenha: string = '';
  dataNascimento: string = '';
  emailInput: string = '';
  perfil: any = {};
  perfilSelecionadoId: number;
  perfilSelecionado: number;
  ufId: number;
  confirmarSenha: string = '';
  endereco: any = {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: {
      id: 0,
      nome: '',
      sigla: '',
    },
    cep: '',
  };

  // Variáveis de estado para armazenar mensagens de erro
  nomeErro: string = '';
  dataNascimentoErro: string = '';
  emailErro: string = '';
  perfilErro: string = '';
  senhaErro: string = '';
  confirmarSenhaErro: string = '';
  logradouroErro: string = '';
  numeroErro: string = '';
  bairroErro: string = '';
  cidadeErro: string = '';
  ufErro: string = '';
  cepErro: string = '';

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private perfisService: PerfisService,
    private location: Location,
    private modalCommunicationService: ModalCommunicationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private unidadesFederativasService: UnidadesFederativasService,
    private charCountService: CharCountService,
    private utilService: UtilService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Usar forkJoin para garantir que initializeComponent seja chamado após getPerfis e getUfs
    forkJoin([this.getPerfis(), this.getUfs()]).subscribe(() => {
      this.initializeComponent();
    });
  }

  onInputChange(inputId: string, charCountId: string, maxLength: number): void {
    this.charCountService.updateCharCount(inputId, charCountId, maxLength);
  }

  getPerfis() {
    return this.perfisService.getPerfis().pipe(
      tap((perfis) => {
        this.lstPerfis = Array.isArray(perfis) ? perfis : []; // Certifique-se de que perfis é um array
      })
    );
  }

  getUfs() {
    return this.unidadesFederativasService.getUnidadesFederativas({}).pipe(
      tap((response: any) => {
        // Verifique se response é um objeto e tem a propriedade ufs
        if (response && Array.isArray(response.ufs)) {
          this.lstUfs = response.ufs;
        } else {
          this.lstUfs = [];
        }
        console.log('Unidades Federativas:', this.lstUfs); // Verificação
      })
    );
  }

  validarCampos(): boolean {
    // Resetar mensagens de erro
    this.nomeErro = '';
    this.dataNascimentoErro = '';
    this.emailErro = '';
    this.perfilErro = '';
    this.senhaErro = '';
    this.confirmarSenhaErro = '';
    this.logradouroErro = '';
    this.numeroErro = '';
    this.bairroErro = '';
    this.cidadeErro = '';
    this.ufErro = '';
    this.cepErro = '';

    let isValid = true;

    // Validação dos campos
    if (!this.nome) {
      this.nomeErro = 'Nome é obrigatório';
      isValid = false;
    }
    if (!this.dataNascimento) {
      this.dataNascimentoErro = 'Data de nascimento é obrigatória';
      isValid = false;
    }
    if (!this.emailInput) {
      this.emailErro = 'Email é obrigatório';
      isValid = false;
    } else if (!this.utilService.validarEmail(this.emailInput)) {
      this.emailErro = 'Email inválido';
      isValid = false;
    }
    if (!this.perfil) {
      this.perfilErro = 'Perfil é obrigatório';
      isValid = false;
    }
    if (!this.senha && this.isCreateMode) {
      this.senhaErro = 'Senha é obrigatória';
      isValid = false;
    }
    if (!this.confirmarSenha && this.isCreateMode) {
      this.confirmarSenhaErro = 'Confirmar Senha é obrigatória';
      isValid = false;
    }
    if (!this.endereco.logradouro) {
      this.logradouroErro = 'Logradouro é obrigatório';
      isValid = false;
    }
    if (!this.endereco.numero) {
      this.numeroErro = 'Número é obrigatório';
      isValid = false;
    }
    if (!this.endereco.bairro) {
      this.bairroErro = 'Bairro é obrigatório';
      isValid = false;
    }
    if (!this.endereco.cidade) {
      this.cidadeErro = 'Cidade é obrigatória';
      isValid = false;
    }
    if (!this.endereco.uf) {
      this.ufErro = 'Estado (UF) é obrigatório';
      isValid = false;
    }
    if (!this.endereco.cep) {
      this.cepErro = 'CEP é obrigatório';
      isValid = false;
    }

    return isValid;
  }

  validarCampo(campo: string): void {
    switch (campo) {
      case 'nome':
        this.nomeErro = !this.nome ? 'Nome é obrigatório' : '';
        break;
      case 'dataNascimento':
        const currentDate = new Date();
        const birthDate = new Date(this.dataNascimento);

        this.dataNascimentoErro =
          !this.dataNascimento || this.dataNascimento.trim() === ''
            ? 'Data de nascimento é obrigatória'
            : birthDate > currentDate
            ? 'Data de nascimento não pode ser maior que a data atual'
            : '';
        break;
      case 'email':
        if (!this.emailInput) {
          this.emailErro = 'Email é obrigatório';
        } else if (!this.utilService.validarEmail(this.emailInput)) {
          this.emailErro = 'Email inválido';
        } else {
          this.emailErro = '';
        }
        break;
      case 'perfil':
        this.perfilErro = !this.perfil ? 'Perfil é obrigatório' : '';
        break;
      case 'senha':
        this.senhaErro = !this.senha ? 'Senha é obrigatória' : '';
        break;
      case 'confirmarSenha':
        this.confirmarSenhaErro = !this.confirmarSenha
          ? 'Confirmar Senha é obrigatória'
          : '';
        break;
      case 'logradouro':
        this.logradouroErro = !this.endereco.logradouro
          ? 'Logradouro é obrigatório'
          : '';
        break;
      case 'numero':
        this.numeroErro = !this.endereco.numero ? 'Número é obrigatório' : '';
        break;
      case 'bairro':
        this.bairroErro = !this.endereco.bairro ? 'Bairro é obrigatório' : '';
        break;
      case 'cidade':
        this.cidadeErro = !this.endereco.cidade ? 'Cidade é obrigatória' : '';
        break;
      case 'uf':
        this.ufErro = !this.endereco.uf ? 'Estado (UF) é obrigatório' : '';
        break;
      case 'cep':
        this.cepErro = !this.endereco.cep ? 'CEP é obrigatório' : '';
        break;
    }

    this.validarConfirmacaoSenha();
  }

  validarConfirmacaoSenha(): void {
    if (
      this.senha !== null &&
      this.senha !== '' &&
      this.confirmarSenha !== null &&
      this.confirmarSenha !== '' &&
      this.senha !== this.confirmarSenha
    ) {
      this.confirmarSenhaErro = 'As senhas não coincidem';
    } else {
      this.confirmarSenhaErro = '';
    }
  }

  salvarUsuario() {
    if (this.validarCampos()) {
      const usuario = this.criarUsuario();

      if (this.acao === 'Alterar') {
        this.usuariosService.updateUsuario(usuario).subscribe(
          (response) => {
            this.snackBar.open('Usuário atualizado com sucesso', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            } as MatSnackBarConfig);
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            this.modalCommunicationService.abrirModal(
              'Erro ao atualizar usuário\n' + this.formatarErro(error),
              'error'
            );
          }
        );
      } else {
        this.usuariosService.saveUsuario(usuario).subscribe(
          (response) => {
            this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            } as MatSnackBarConfig);
            this.router.navigate(['/usuarios']);
          },
          (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message:
                  'Erro ao criar usuário!<br>E-mail utilizado por outro usuário.',
              },
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-multiline'],
            });
          }
        );
      }
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
    if (acao === 'Alterar') {
      this.translate.get('TITLE_ALTERAR_USUARIO').subscribe((res: string) => {
        this.titulo = res;
        alert('this.titulo: ' + this.titulo);
      });
    } else if (acao === 'Cadastrar') {
      this.translate.get('TITLE_CADASTRAR_USUARIO').subscribe((res: string) => {
        this.titulo = res;
      });
    } else {
      this.translate.get('TITLE_DETALHAR_USUARIO').subscribe((res: string) => {
        this.titulo = res;
      });
      this.isEditMode = false;
    }
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

    const usuario = data.usuarios[0];

    this.id = usuario.id;
    this.nome = usuario.nome;
    this.dataNascimento = usuario.dataNascimento;
    this.emailInput = usuario.email;
    this.perfilSelecionadoId =
      usuario.perfis.length > 0 ? usuario.perfis[0].id : null;
    if (usuario.enderecos && usuario.enderecos.length > 0) {
      this.endereco = usuario.enderecos[0];
      this.ufId = this.endereco.uf.id;
    }
    this.validarCampos();
  }

  private initializeComponent() {
    this.route.paramMap.subscribe((params) => {
      this.acao = history.state.acao || '';
      const usuario = history.state.usuario || undefined;
      const id = params.get('id');

      if (this.acao) {
        this.definirTitulo(this.acao);
      } else {
        this.definirTitulo(undefined);
      }

      if (id) {
        this.isCreateMode = false;
        this.usuariosService.getUsuarioById(+id).subscribe((usuario) => {
          this.preencherFormulario(usuario);
        });
      } else {
        this.isCreateMode = true;
      }
    });
  }

  private criarUsuario(): any {
    const perfilSelecionado = this.lstPerfis.find((perfil) => {
      return Number(perfil.id) === Number(this.perfilSelecionadoId);
    });

    const perfis = perfilSelecionado
      ? [
          {
            id: this.perfilSelecionadoId,
            nome: perfilSelecionado.nome,
          },
        ]
      : [];

    const usuario = {
      id: this.id,
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      email: this.emailInput,
      senha: this.senha,
      perfis: perfis,
      enderecos: [
        {
          id: this.endereco.id,
          logradouro: this.endereco.logradouro,
          numero: this.endereco.numero,
          complemento: this.endereco.complemento,
          bairro: this.endereco.bairro,
          cidade: this.endereco.cidade,
          uf: this.endereco.uf,
          cep: this.endereco.cep,
        },
      ],
    };

    return usuario;
  }
}
