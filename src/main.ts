import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { RouterModule } from '@angular/router'; // Add this line
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app-routing.module';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

// Import standalone components and directives
import { HomePageComponent } from './app/component/home-page/home-page.component';
import { LoginComponent } from './app/component/login/login.component';
import { LembrarSenhaComponent } from './app/component/lembrar-senha/lembrar-senha.component';
import { NovaSenhaComponent } from './app/component/nova-senha/nova-senha.component';
import { TermsComponent } from './app/component/terms/terms.component';
import { PrivacyComponent } from './app/component/privacy/privacy.component';
import { DashboardComponent } from './app/component/dashboard/dashboard.component';
import { ChatComponent } from './app/component/chat/chat.component';
import { MessageModalComponent } from './app/shared/components/modal/message-modal/message-modal.component'; // Add this line

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(routes),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'pt',
      })
    ),
    provideHttpClient(),
    // Add standalone components and directives to providers
    HomePageComponent,
    LoginComponent,
    LembrarSenhaComponent,
    NovaSenhaComponent,
    TermsComponent,
    PrivacyComponent,
    DashboardComponent,
    ChatComponent,
    MessageModalComponent, // Add this line
  ],
}).catch((err) => console.error(err));
