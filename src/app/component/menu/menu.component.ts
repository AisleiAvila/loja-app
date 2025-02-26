import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { PerfilAcessoDirective } from '../../directive/perfil-acesso.directive';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    PerfilAcessoDirective,
    TranslateModule,
  ],
})
export class MenuComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef;
  @Output() expansionChange = new EventEmitter<boolean>();
  @Input() isExpanded = false;
  activeRoute = '';
  isHandset = false;

  constructor(
    private router: Router,
    private location: Location,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute = this.location.path();
      });

    this.translate.get('TITLE_AGENDAMENTOS').subscribe((text) => {
      const agendamentoItem = this.menuItems.find(
        (item) => item.route === '/agendamentos'
      );
      if (agendamentoItem) {
        agendamentoItem.label = text;
      }
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isHandset = result.matches;
        if (this.isHandset) {
          this.isExpanded = false;
        } else {
          this.isExpanded = true;
        }
        this.expansionChange.emit(this.isExpanded);
      });
  }

  menuItems = [
    {
      label: 'Home',
      icon: 'home',
      action: () => this.home(),
      route: '/home',
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
    {
      label: 'BackLog',
      icon: 'list',
      route: '/backlog',
      action: () => this.navigateToBackLog(),
    },
    {
      icon: 'event',
      label: 'Agendamentos',
      route: '/agendamentos',
      action: () => this.navigateToAgendamentos(),
    },
  ];

  home(): void {
    const authorization = localStorage.getItem('Authorization');
    if (!authorization) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/home']);
  }

  navigateToUsuarios(): void {
    if (this.isAuthorization()) {
      this.router.navigate(['/usuarios']);
    }
  }

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

  navigateToBackLog() {
    if (this.isAuthorization()) {
      this.router.navigate(['/backlog']);
    }
  }

  navigateToAgendamentos(): void {
    if (this.isAuthorization()) {
      this.router.navigate(['/agendamentos']);
    }
  }

  toggleExpansion(): void {
    if (!this.isHandset) {
      this.isExpanded = !this.isExpanded;
      this.expansionChange.emit(this.isExpanded);
    }
  }

  private isAuthorization(): boolean {
    const authorization = localStorage.getItem('Authorization');
    console.log('Token de autorização:', authorization);
    return authorization != null;
  }

  isActive(route: string): boolean {
    return this.activeRoute.startsWith(route);
  }
}
