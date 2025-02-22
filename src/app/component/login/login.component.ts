import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { LoginService } from '../../service/login.service';
import { ModalCommunicationService } from '../../service/modal-communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
/**
 * Componente responsável por exibir a tela de login da aplicação.
 */
export class LoginComponent implements OnInit {
  @ViewChild('loginButton') loginButton!: ElementRef;

  email: string | undefined;
  senha: string | undefined;
  lembrarSenha: boolean | undefined;
  mensagem: string;
  isProcessing = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalCommunicationService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Obter a mensagem dos parâmetros da URL
    this.route.queryParams.subscribe((params) => {
      this.mensagem = params['mensagem'];
    });
  }

  /**
   * Método responsável por realizar o login do usuário.
   */
  fazerLogin(): void {
    console.log('Fazendo login...');
    // Dentro do método fazerLogin
    if (!this.email || !this.senha) {
      this.translate.get('ERRO_LOGIN').subscribe((texto: string) => {
        this.modalService.abrirModal(texto, 'Erro de Login');
      });
      return;
    } else {
      this.loginService.getLogin(this.email, this.senha).subscribe({
        next: (response) => {
          // Tratar a resposta bem-sucedida
          console.log('Login bem-sucedido', response);
        },
        error: (error) => {
          // Tratar o erro
          console.error('Erro no login', error);
        },
      });
    }
  }

  onLogin(): void {
    this.isProcessing = true;

    // Usar o loginService existente em vez de authService
    if (!this.email || !this.senha) {
      this.modalService.abrirModal(
        'Email e senha são obrigatórios',
        'Erro de Login'
      );
      this.isProcessing = false;
      return;
    }

    this.loginService
      .getLogin(this.email, this.senha)
      .pipe(
        finalize(() => {
          if (this.isProcessing) {
            setTimeout(() => {
              this.isProcessing = false;
            }, 2000);
          }
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Login bem-sucedido', response);
          // Manter processando até o redirecionamento
        },
        error: (error) => {
          console.error('Erro no login', error);
          this.isProcessing = false;
          this.renderer.addClass(this.loginButton.nativeElement, 'error');
          setTimeout(() => {
            this.renderer.removeClass(this.loginButton.nativeElement, 'error');
          }, 1000);
        },
      });
  }

  /**
   * Método responsável por recuperar a senha do usuário.
   */
  recuperarSenha(): void {
    this.router.navigate(['/lembrar-senha']);
    // if (!this.email) {
    //   this.modalService.abrirModal(
    //     'Email é obrigatório',
    //     'Erro de Recuperação de Senha'
    //   );
    // } else {
    //   this.modalService.abrirModal(
    //     'Falta implementar método para Esqueceu a senha...',
    //     'Recuperação de Senha'
    //   );
    // }
  }
}
