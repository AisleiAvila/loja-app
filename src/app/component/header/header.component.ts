import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    TranslateModule,
  ],
})
export class HeaderComponent implements OnInit {
  isLoginScreen = false;
  title = 'Loja XPTO';
  nomeUsuario: string | null = localStorage.getItem('nomeUsuario');

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginScreen = this.router.url === '/login';
      }
    });
  }

  ngOnInit(): void {
    this.checkAuthorization();
  }

  private limparDadosELogout(): void {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('nomeUsuario');
    this.router.navigate(['/login']);
  }

  logout(): void {
    const token = localStorage.getItem('Authorization');
    if (token) {
      this.authService.revogarToken(token).subscribe(
        () => {
          this.limparDadosELogout();
        },
        (error) => {
          console.error('Erro ao revogar token:', error);
          this.limparDadosELogout();
        }
      );
    } else {
      this.limparDadosELogout();
    }
  }

  getNomeUsuario(): string {
    this.nomeUsuario = localStorage.getItem('nomeUsuario');
    return this.nomeUsuario || '';
  }

  checkAuthorization(): void {
    const authorization = localStorage.getItem('Authorization');
    // Se não tiver autorização e não estiver na tela de login ou na tela Lembrar Senha, redireciona para a tela de login
    if (this.router.url === '/lembrar-senha') {
      this.isLoginScreen = true;
    } else if (!authorization && this.router.url !== '/lembrar-senha') {
      this.navigateToLogin();
    }
  }

  navigateToLogin(): void {
    localStorage.removeItem('navigateToLogin');
    this.router.navigate(['/login']);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
