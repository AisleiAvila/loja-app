import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // Supondo que você esteja usando ngx-translate para internacionalização

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private translate: TranslateService) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
