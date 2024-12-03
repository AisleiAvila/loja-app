import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @ViewChild('menu') menu!: ElementRef;
  @Output() expansionChange = new EventEmitter<boolean>();
  isExpanded = false;
  activeRoute: string = '';

  menuItems = [
    {
      label: 'Home',
      icon: 'home',
      action: () => this.home(),
      route: '/home',
    },
    {
      label: 'UF',
      icon: 'location_city',
      action: () => this.navigateToUnidadesFederativas(),
      route: '/unidades-federativas',
    },
    {
      label: 'Usuários',
      icon: 'person',
      action: () => this.navigateToUsuarios(),
      route: '/usuarios',
    },
    {
      label: 'Organização',
      icon: 'business',
      action: () => this.navigateToOrganizacoes(),
      route: '/organizacao',
    },
    {
      label: 'Produtos',
      icon: 'inventory_2',
      action: () => this.navigateToProdutos(),
      route: '/produtos',
    },
    {
      label: 'Chat',
      icon: 'chat',
      action: () => this.navigateToChat(),
      route: '/chat',
    },
    {
      label: 'Login',
      icon: 'login',
      action: () => this.navigateToLogin(),
      route: '/login',
    },
    {
      label: 'Termos de Serviço',
      icon: 'description',
      action: () => this.navigateToTerms(),
      route: '/terms',
    },
    {
      label: 'Política de Privacidade',
      icon: 'security',
      action: () => this.navigateToPrivacy(),
      route: '/privacy',
    },
  ];

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute = this.location.path();
      });
  }

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

  navigateToChat(): void {
    if (this.isAuthorization()) {
      this.router.navigate(['/chat']);
    }
  }

  navigateToTerms() {
    this.router.navigate(['/terms']);
  }

  navigateToPrivacy() {
    this.router.navigate(['/privacy']);
  }

  navigateToOrganizacoes() {
    if (this.isAuthorization()) {
      this.router.navigate(['/organizacao']);
    }
  }

  navigateToProdutos() {
    if (this.isAuthorization()) {
      this.router.navigate(['/produtos']);
    }
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
    console.log('Token de autorização:', authorization); // Debug
    return authorization != null;
  }

  isActive(route: string): boolean {
    return this.activeRoute.startsWith(route);
  }
}
