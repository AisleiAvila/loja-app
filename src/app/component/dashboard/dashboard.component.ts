import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  functionalities = [
    { name: 'Home', route: '/home', image: 'assets/icons/home.svg' },
    {
      name: 'Produtos',
      route: '/produtos',
      image: 'assets/icons/inventory_2.svg',
    },
    {
      name: 'Unidades Federativas',
      route: '/unidades-federativas',
      image: 'assets/icons/location_city.svg',
    },
    {
      name: 'Usuários',
      route: '/usuarios',
      image: 'assets/icons/person.svg',
    },
    { name: 'Chat', route: '/chat', image: 'assets/icons/chat.svg' },
    {
      name: 'Organização',
      route: '/organizacao',
      image: 'assets/icons/business.svg',
    },
    // ...additional functionalities...
  ];

  constructor() {}

  ngOnInit(): void {
    // ...existing code...
  }
}
