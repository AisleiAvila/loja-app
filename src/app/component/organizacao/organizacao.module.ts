import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacaoComponent } from './organizacao.component';
import { CadastroOrganizacaoComponent } from './cadastro-organizacao/cadastro-organizacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  MatOptionModule,
} from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/date-format';
import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
import { HeaderModule } from '../header/header.module';

const routes: Routes = [
  { path: '', component: OrganizacaoComponent },
  { path: 'cadastro-organizacao', component: CadastroOrganizacaoComponent },
];

@NgModule({
  declarations: [OrganizacaoComponent, CadastroOrganizacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbModalModule,
    SharedModule,

    // Material Modules
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,

    // App Modules
    HeaderModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
  exports: [OrganizacaoComponent, CadastroOrganizacaoComponent],
})
export class OrganizacaoModule {}
