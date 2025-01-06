import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule],
})
export class BodyComponent implements OnInit {
  @Input() isExpanded = false;
  @Output() expansionChange = new EventEmitter<boolean>();
  showMenu = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
    this.checkRoute();
  }

  checkRoute() {
    const currentRoute = this.router.url;
    this.showMenu = !currentRoute.includes('login');
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.expansionChange.emit(this.isExpanded);
  }

  onExpansionChange(isExpanded: boolean) {
    this.isExpanded = isExpanded;
  }
}
