import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  functionalities = [
    { name: 'Home', route: '/home', image: 'assets/icons/home.png' },
    {
      name: 'Produtos',
      route: '/produtos',
      image: 'assets/icons/produtos.png',
    },
    {
      name: 'Unidades Federativas',
      route: '/unidades-federativas',
      image: 'assets/icons/unidades-federativas.png',
    },
    {
      name: 'Usuários',
      route: '/usuarios',
      image: 'assets/icons/usuarios.png',
    },
    { name: 'Chat', route: '/chat', image: 'assets/icons/chat.png' },
    {
      name: 'Organização',
      route: '/organizacao',
      image: 'assets/icons/organizacao.png',
    },
    // ...additional functionalities...
  ];

  constructor() {}

  ngOnInit(): void {
    // ...existing code...
  }
}
