import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterModule],
})
export class BodyComponent {
  @Input() isExpanded = false;
  @Output() expansionChange = new EventEmitter<boolean>();

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
    this.expansionChange.emit(this.isExpanded);
    console.log('Menu expanded:', this.isExpanded);
  }

  onExpansionChange(isExpanded: boolean) {
    this.isExpanded = isExpanded;
    console.log('Menu expanded:', this.isExpanded);
  }
}
