import { CommonModule, formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin, tap } from 'rxjs';
import { ApiError } from 'src/app/model/apiError.model';
import { Cidade } from 'src/app/model/cidade.model';
import { Estado } from 'src/app/model/estado.model';
import { Pais } from 'src/app/model/pais.model';
import { Perfil } from 'src/app/model/perfil.model';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioResponseDTO } from 'src/app/model/usuarioResponseDTO.model';
import { CidadeService } from 'src/app/service/cidade.service';
import { EstadoService } from 'src/app/service/estado.service';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { PaisService } from 'src/app/service/pais.service';
import { PerfisService } from 'src/app/service/perfis.service';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { UtilService } from 'src/app/shared/service/util.service';
import { UsuariosService } from '../../../service/usuarios.service';
import { CharCountService } from '../../../shared/service/char-count.service';
import { Endereco } from './../../../model/endereco.model';

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
  nomePais = '';
  lstPaises: Pais[] = [];
  paisId: number;
  lstEstados: Estado[] = [];
  estadoId: number;
  nomeEstado = '';
  lstCidades: Cidade[] = [];
  cidadeId: number;
  nomeCidade = '';

  lstPerfis: Perfil[] = []; // Certifique-se de que lstPerfis é um array
  id = 0;
  nome = '';
  senha = '';
  reSenha = '';
  dataNascimento: Date;
  emailUsuarioInput = '';
  perfil: Perfil = { id: 0, nome: '' };
  perfilSelecionadoId: number;
  perfilSelecionado: number;
  paisSelecionadoId: number;
  estadoSelecionadoId: number;
  cidadeSelecionadoId: number;
  confirmarSenha = '';
  endereco: Endereco = {
    id: 0,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade_id: {
      id: 0,
      nome: '',
      estado_id: {
        id: 0,
        nome: '',
        pais_id: {
          id: 0,
          nome: '',
        },
      },
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
  cepErro = '';
  paisErro = '';
  estadoErro = '';

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private perfisService: PerfisService,
    private paisService: PaisService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private modalService: ModalCommunicationService,
    private location: Location,
    private modalCommunicationService: ModalCommunicationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private charCountService: CharCountService,
    private utilService: UtilService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.getPerfis(),
      this.getPaises(),
    ]).subscribe(() => {
      this.initializeComponent();
    });
  }

  onInputChange(inputId: string, charCountId: string, maxLength: number): void {
    this.charCountService.updateCharCount(inputId, charCountId, maxLength);
  }

  getPerfis() {
    return this.perfisService.getPerfis().pipe(
      tap((perfis) => {
        this.lstPerfis = Array.isArray(perfis) ? perfis : [];
      })
    );
  }

  getPaises() {
    return this.paisService.getPais({ nome: this.nomePais }).pipe(
      tap((paises) => {
        this.lstPaises = Array.isArray(paises) ? paises : [];
      })
    );
  }

  getEstados() {
    this.endereco.cidade_id.estado_id.pais_id.id = this.paisId;
    this.estadoService.findEstados(null, this.paisId).subscribe({
      next: (estados) => {
        console.log('Estados recebidos:', estados);
        this.lstEstados = Array.isArray(estados) ? estados : [];
      },
      error: (erro) => {
        console.error('Erro ao buscar estados:', erro);
      }
    });
  }

  getCidades() {
    this.endereco.cidade_id.estado_id.id = this.estadoId;
    this.cidadeService.getCidade(this.nomeCidade, this.estadoId).subscribe({
      next: (cidades) => {
        this.lstCidades = Array.isArray(cidades) ? cidades : [];
      },
      error: (erro) => {
        console.error('Erro ao buscar cidades:', erro);
      }
    });
  }

  selecionarCidade() {
    this.endereco.cidade_id.id = this.cidadeId;
  }

  validarCampos(): boolean {
    this.resetarErros();

    let isValid = true;

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

    if (this.endereco.bairro == null || this.endereco.bairro == '') {
      this.bairroErro = this.translate.instant('LABLE_BAIRRO_OBRIGATORIO');
      isValid = false;
    }

    if (this.endereco.cidade_id.id == null || this.endereco.cidade_id.id == 0) {
      this.cidadeErro = this.translate.instant('LABLE_CIDADE_OBRIGATORIA');
      isValid = false;
    }

    if (this.endereco.cidade_id.estado_id.pais_id.id == null || this.endereco.cidade_id.estado_id.pais_id.id == 0) {
        this.paisErro = this.translate.instant('LABLE_PAIS_OBRIGATORIA');
      isValid = false;
    }

    if (this.endereco.cidade_id.estado_id.id == null || this.endereco.cidade_id.estado_id.id  == 0) {
        this.estadoErro = this.translate.instant('LABLE_ESTADO_OBRIGATORIA');
      isValid = false;
    }

    if (!this.endereco.cep?.trim()) {
      this.cepErro = this.translate.instant('LABLE_CEP_OBRIGATORIO');
      isValid = false;
    }

    // Se houver campos inválidos, exibir snackbar com mensagem
    if (!isValid) {
      this.translate.get('LABLE_CAMPOS_OBRIGATORIOS').subscribe((texto: string) => {
        this.modalService.abrirModal(texto, 'Erro');
      });
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
            this.formatarErro(error),
            'error'
          );
        }
      );
    } else {
      alert('Usuário: ' + JSON.stringify(usuario));
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
    this.dataNascimento = new Date(usuario.dataNascimento);
    this.emailUsuarioInput = usuario.email;
    this.perfilSelecionadoId =
      usuario.perfis.length > 0 ? usuario.perfis[0].id : null;
    if (usuario.enderecos && usuario.enderecos.length > 0) {
      this.endereco = usuario.enderecos[0];
      this.cidadeSelecionadoId = this.endereco.cidade_id.id;
      this.estadoSelecionadoId = this.endereco.cidade_id.estado_id.id;
      this.paisSelecionadoId = this.endereco.cidade_id.estado_id.pais_id.id;
      this.cidadeId = this.endereco.cidade_id.id;
      this.estadoId = this.endereco.cidade_id.estado_id.id;
      this.paisId = this.endereco.cidade_id.estado_id.pais_id.id;
      forkJoin([
        this.getEstados(),
        this.getCidades(),
      ]).subscribe(() => {
        this.initializeComponent();
      });
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
        this.emailUsuarioInput = '';
      }
    });
  }

  private criarUsuario(): Usuario {
    // Encontrar o perfil selecionado
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
          cidade_id: {
            id: this.endereco.cidade_id.id,
            nome: this.nomeCidade,
            estado_id: {
              id: this.endereco.cidade_id.estado_id.id,
              nome: this.nomeEstado,
              pais_id: {
                id: this.endereco.cidade_id.estado_id.pais_id.id,
                nome: this.nomePais
              }
            }
          },
          cep: this.endereco.cep,
        },
      ],
    };

    return usuario;
  }
}
