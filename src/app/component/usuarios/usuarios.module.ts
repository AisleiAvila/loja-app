import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/shared/date-format';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  // outras rotas
];

@NgModule({
  declarations: [UsuariosComponent, CadastroUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderModule,
    FooterModule,
    MatIconModule,
    NgbModalModule,
    MatButtonModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    TranslateModule,
    MatToolbarModule,
  ],

  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
  exports: [UsuariosComponent, CadastroUsuarioComponent],
})
export class UsuariosModule {}
