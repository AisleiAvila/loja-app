import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoginScreen: boolean = false;
  title = 'Loja XPTO';
  nomeUsuario: string | null = localStorage.getItem('nomeUsuario');

  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginScreen = this.router.url === '/login';
      }
    });
  }

  ngOnInit(): void {
    this.checkAuthorization();
  }

  logout(): void {
    localStorage.removeItem('authorization');
    localStorage.removeItem('nomeUsuario');
    this.router.navigate(['/login']);
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
