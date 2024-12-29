import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
})
export class PrivacyComponent {
  constructor() {}
}
