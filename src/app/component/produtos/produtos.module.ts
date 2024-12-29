// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
// import { TranslateModule } from '@ngx-translate/core';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// // Material Imports
// import { MatTableModule } from '@angular/material/table';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatSnackBarModule } from '@angular/material/snack-bar';

// // Components
// // import { HeaderModule } from '../header/header.module';
// import { ProdutosComponent } from './produtos.component';
// import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
// import { SharedModule } from 'src/app/shared/shared.module';

// // Services and Providers
// import { MatPaginatorIntl } from '@angular/material/paginator';
// import { CustomPaginatorIntl } from 'src/app/shared/service/custom-paginator-intl';
// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
// import { APP_DATE_FORMATS, AppDateAdapter } from 'src/app/shared/date-format';
// import { HeaderComponent } from '../header/header.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ProdutosComponent,
//   },
//   { path: '', component: ProdutosComponent },
//   { path: 'cadastro-produto', component: CadastroProdutoComponent },
// ];

// @NgModule({
//   declarations: [ProdutosComponent, CadastroProdutoComponent],
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule.forChild(routes),
//     TranslateModule.forChild(),
//     NgbModalModule,
//     SharedModule,
//     HeaderComponent,

//     // Material Modules
//     MatTableModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//     MatTooltipModule,
//     MatNativeDateModule,
//     MatDatepickerModule,
//     MatPaginatorModule,
//     MatSortModule,
//     MatToolbarModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatSnackBarModule,
//   ],
//   providers: [
//     { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
//     { provide: DateAdapter, useClass: AppDateAdapter },
//     { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
//   ],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
//   exports: [ProdutosComponent, CadastroProdutoComponent],
// })
// export class ProdutosModule {
//   constructor() {
//     console.log('ProdutosModule sendo instanciado');
//     console.log('Rotas do módulo:', routes);
//   }
// }
