import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterModule } from './component/footer/footer.module';
import { HeaderModule } from './component/header/header.module';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LembrarSenhaComponent } from './component/lembrar-senha/lembrar-senha.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { UnidadesFederativasModule } from './component/unidades-federativas/unidades-federativas.module';
import { UsuariosModule } from './component/usuarios/usuarios.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CustomSnackbarComponent } from './shared/components/custom-snackbar/custom-snackbar.component';
import { MessageModalComponent } from './shared/components/modal/message-modal/message-modal.component';
import { CustomPaginatorIntl } from './shared/service/custom-paginator-intl';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    MessageModalComponent,
    LembrarSenhaComponent,
    MenuComponent,
    CustomSnackbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    UnidadesFederativasModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    HeaderModule,
    FooterModule,
    NgbModalModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    UsuariosModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
