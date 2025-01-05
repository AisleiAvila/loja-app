import { CommonModule, formatDate, Location } from '@angular/common';
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { Perfil } from 'src/app/model/perfil.model';
import { Endereco } from 'src/app/model/endereco.model';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioResponseDTO } from 'src/app/model/usuarioResponseDTO.model';
import { ApiError } from 'src/app/model/apiError.model';
import { UnidadeFederativa } from 'src/app/model/unidadeFederativa.model';
import { UnidadesFederativas } from 'src/app/model/unidadesFederativas.model';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatNativeDateModule,
    TranslateModule,
  ],
})
export class CadastroUsuarioComponent implements OnInit {
  isEditMode = false;
  isCreateMode = false;
  titulo = '';
  acao = '';

  lstPerfis: Perfil[] = []; // Certifique-se de que lstPerfis é um array
  lstUfs: UnidadeFederativa[] = []; // Certifique-se de que lstUfs é um array
  id = 0;
  nome = '';
  senha = '';
  reSenha = '';
  dataNascimento = '';
  emailUsuarioInput = '';
  perfil: Perfil = { id: 0, nome: '' };
  perfilSelecionadoId: number;
  perfilSelecionado: number;
  ufId: number;
  confirmarSenha = '';
  endereco: Endereco = {
    id: 0,
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
  nomeErro = '';
  dataNascimentoErro = '';
  emailErro = '';
  perfilErro = '';
  senhaErro = '';
  confirmarSenhaErro = '';
  logradouroErro = '';
  numeroErro = '';
  bairroErro = '';
  cidadeErro = '';
  ufErro = '';
  cepErro = '';

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
      tap((response: UnidadesFederativas) => {
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
    // Resetar todas as mensagens de erro
    this.resetarErros();

    let isValid = true;

    // Validar cada campo individualmente
    if (!this.nome?.trim()) {
      this.nomeErro = this.translate.instant('LABLE_NOME_OBRIGATORIO');
      isValid = false;
    }

    if (!this.emailUsuarioInput?.trim()) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_OBRIGATORIO');
      isValid = false;
    } else if (!this.utilService.validarEmail(this.emailUsuarioInput)) {
      this.emailErro = this.translate.instant('LABLE_EMAIL_INVALIDO');
      isValid = false;
    }

    if (!this.dataNascimento) {
      this.dataNascimentoErro = this.translate.instant(
        'LABLE_DATA_NASCIMENTO_OBRIGATORIA'
      );
      isValid = false;
    }

    if (!this.perfilSelecionadoId) {
      this.perfilErro = this.translate.instant('LABLE_PERFIL_OBRIGATORIO');
      isValid = false;
    }

    if (this.isCreateMode) {
      if (!this.senha?.trim()) {
        this.senhaErro = this.translate.instant('LABLE_SENHA_OBRIGATORIA');
        isValid = false;
      }
      if (!this.confirmarSenha?.trim()) {
        this.confirmarSenhaErro = this.translate.instant(
          'LABLE_CONFIRMAR_SENHA_OBRIGATORIA'
        );
        isValid = false;
      }
      if (this.senha !== this.confirmarSenha) {
        this.confirmarSenhaErro = this.translate.instant(
          'LABLE_SENHAS_DIFERENTES'
        );
        isValid = false;
      }
    }

    // Validar campos de endereço
    if (!this.endereco.logradouro?.trim()) {
      this.logradouroErro = this.translate.instant(
        'LABLE_LOGRADOURO_OBRIGATORIO'
      );
      isValid = false;
    }

    if (this.endereco.numero == null || this.endereco.numero == '') {
      this.numeroErro = this.translate.instant('LABLE_NUMERO_OBRIGATORIO');
      isValid = false;
    }

    if (!this.endereco.bairro?.trim()) {
      this.bairroErro = this.translate.instant('LABLE_BAIRRO_OBRIGATORIO');
      isValid = false;
    }

    if (!this.endereco.cidade?.trim()) {
      this.cidadeErro = this.translate.instant('LABLE_CIDADE_OBRIGATORIA');
      isValid = false;
    }

    if (!this.ufId) {
      this.ufErro = this.translate.instant('LABLE_UF_OBRIGATORIA');
      isValid = false;
    }

    if (!this.endereco.cep?.trim()) {
      this.cepErro = this.translate.instant('LABLE_CEP_OBRIGATORIO');
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
    this.dataNascimentoErro = '';
    this.perfilErro = '';
    this.senhaErro = '';
    this.confirmarSenhaErro = '';
    this.logradouroErro = '';
    this.numeroErro = '';
    this.bairroErro = '';
    this.cidadeErro = '';
    this.ufErro = '';
    this.cepErro = '';
  }

  salvarUsuario() {
    // Validar todos os campos antes de salvar
    if (!this.validarCampos()) {
      // Rolar a página até o primeiro campo com erro
      const firstErrorField = document.querySelector('.mat-form-field-invalid');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const usuario = this.criarUsuario();

    if (this.acao === 'Alterar') {
      this.usuariosService.updateUsuario(usuario).subscribe(
        () => {
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
        () => {
          this.snackBar.open('Usuário criado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          } as MatSnackBarConfig);
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
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
      titleKey = 'TITLE_ALTERAR_USUARIO';
    } else if (acao === 'Cadastrar') {
      titleKey = 'TITLE_CADASTRAR_USUARIO';
    } else {
      titleKey = 'TITLE_DETALHAR_USUARIO';
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

  private preencherFormulario(jsonData: UsuarioResponseDTO): void {
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
    this.emailUsuarioInput = usuario.email;
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
        this.emailUsuarioInput = ''; // Limpa o campo de e-mail ao iniciar a tela de cadastramento
      }
    });
  }

  private criarUsuario(): Usuario {
    // Encontrar o perfil selecionado
    const perfilSelecionado = this.lstPerfis.find((perfil) => {
      return Number(perfil.id) === Number(this.perfilSelecionadoId);
    });

    // Encontrar a UF selecionada
    const ufSelecionada = this.lstUfs.find((uf) => {
      return Number(uf.id) === Number(this.ufId);
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
      dataNascimento: this.dataNascimento
        ? formatDate(this.dataNascimento, 'yyyy-MM-dd', 'en-US')
        : null,
      email: this.emailUsuarioInput,
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
          uf: ufSelecionada
            ? {
                id: ufSelecionada.id,
                nome: ufSelecionada.nome,
                sigla: ufSelecionada.sigla,
              }
            : null,
          cep: this.endereco.cep,
        },
      ],
    };

    return usuario;
  }
}
