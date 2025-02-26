import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatLineModule,
  ],
})
/**
 * Componente responsável por exibir a página inicial da aplicação.
 */
export class HomePageComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get podeAcessarUsuarios(): boolean {
    const perfilUsuario = this.authService.getPerfilUsuario();
    return ['ADMINISTRADOR', 'GERENTE'].includes(perfilUsuario);
  }
}
