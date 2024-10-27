import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ModalCommunicationService } from '../../service/modal-communication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
/**
 * Componente responsável por exibir a tela de login da aplicação.
 */
export class LoginComponent implements OnInit {
  email: string | undefined;
  senha: string | undefined;
  lembrarSenha: boolean | undefined;

  mensagem: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: ModalCommunicationService,
    private route: ActivatedRoute
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
      this.modalService.abrirModal(
        'Email e senha são obrigatórios',
        'Erro de Login'
      );
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
