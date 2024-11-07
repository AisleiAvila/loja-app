import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @ViewChild('menu') menu!: ElementRef;
  @Output() expansionChange = new EventEmitter<boolean>();

  menuItems = [
    { label: 'Home', icon: 'home', action: () => this.home() },
    {
      label: 'UF',
      icon: 'location_city',
      action: () => this.navigateToUnidadesFederativas(),
    },
    {
      label: 'Usuários',
      icon: 'person',
      action: () => this.navigateToUsuarios(),
    },
    { label: 'Login', icon: 'login', action: () => this.navigateToLogin() },
  ];

  isExpanded = false;

  constructor(private router: Router) {}

  /**
   * Método responsável por redirecionar o usuário para a tela home.
   */
  home(): void {
    const authorization = localStorage.getItem('Authorization');
    if (!authorization) {
      this.router.navigate(['/login']);
      return;
    }

    // Verifica se o usuário está logado
    this.router.navigate(['/home']);
  }

  /**
   * Método responsável por redirecionar o usuário para a tela de unidades federativas.
   */
  navigateToUnidadesFederativas(): void {
    if (this.isAuthorization()) {
      this.router.navigate(['/unidades-federativas']);
    }
  }

  /**
   * Método responsável por redirecionar o usuário para a tela de usuários.
   */
  navigateToUsuarios(): void {
    if (this.isAuthorization()) {
      this.router.navigate(['/usuarios']);
    }
  }

  /**
   * Método responsável por redirecionar o usuário para a tela de login.
   */
  navigateToLogin(): void {
    localStorage.removeItem('Authorization');
    this.router.navigate(['/login']);
  }

  /**
   * Método responsável por expandir ou recolher o menu lateral.
   */
  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
    this.expansionChange.emit(this.isExpanded);
  }

  private isAuthorization(): boolean {
    const authorization = localStorage.getItem('Authorization');
    return authorization != null;
  }
}
