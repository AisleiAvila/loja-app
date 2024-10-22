// unidades-federativas.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { UnidadesFederativasComponent } from './unidades-federativas.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UnidadesFederativasComponent },
  // outras rotas
];

@NgModule({
  declarations: [UnidadesFederativasComponent],
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
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  exports: [UnidadesFederativasComponent],
})
export class UnidadesFederativasModule {}
