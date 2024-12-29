import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuComponent } from './component/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
})
export class AppComponent {
  isExpanded = false;

  constructor(private translate: TranslateService) {
    // Definir idioma padrão
    this.translate.setDefaultLang('pt');

    // Usar idioma padrão
    this.translate.use('pt');
  }

  /**
   * Método responsável por atualizar o estado de expansão do menu.
   */
  onExpansionChange(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }
}
