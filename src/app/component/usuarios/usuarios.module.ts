import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
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
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  exports: [UsuariosComponent, CadastroUsuarioComponent],
})
export class UsuariosModule {}
