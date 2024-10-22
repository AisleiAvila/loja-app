import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isExpanded = false;

  /**
   * Método responsável por atualizar o estado de expansão do menu.
   */
  onExpansionChange(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
  }
}
