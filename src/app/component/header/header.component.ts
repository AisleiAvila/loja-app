import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoginScreen: boolean = false;
  title = 'Loja XPTO';
  nomeUsuario: string | null = localStorage.getItem('nomeUsuario');

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
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
    localStorage.removeItem('Authorization');
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
    if (!authorization) {
      this.navigateToLogin();
    }
  }

  navigateToLogin(): void {
    localStorage.removeItem('navigateToLogin');
    this.router.navigate(['/login']);
  }
}
