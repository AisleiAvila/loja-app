import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
/**
 * Componente responsável por exibir a página inicial da aplicação.
 */
export class HomePageComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
