import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, DashboardComponent, RouterModule],
})
/**
 * Componente responsável por exibir a página inicial da aplicação.
 */
export class HomePageComponent {
  constructor(private router: Router) {}
}
