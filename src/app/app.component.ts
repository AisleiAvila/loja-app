import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './component/header/header.component';
import { BodyComponent } from './component/body/body.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, BodyComponent],
})
export class AppComponent {
  isLoginScreen = false;
  isExpanded = false;

  constructor(private router: Router, private translate: TranslateService) {
    // Definir idioma padrão
    this.translate.setDefaultLang('pt');

    // Usar idioma padrão
    this.translate.use('pt');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginScreen = this.router.url === '/login';
      }
    });
  }

  /**
   * Método responsável por atualizar o estado de expansão do menu.
   */
  onExpansionChange(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }
}
