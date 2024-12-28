import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  functionalities = [
    {
      name: 'Backlog',
      route: '/backlog',
      image: 'assets/icons/list.svg',
    },
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
