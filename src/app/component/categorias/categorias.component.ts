import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriasService } from 'src/app/service/categorias.service';
import { Categoria } from 'src/app/model/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatOptionModule,
    NgbModalModule,
    TranslateModule
  ]
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  filtroNome: string = '';
  displayedColumns: string[] = ['nome', 'descricao', 'acoes'];

  constructor(private categoriasService: CategoriasService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriasService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  pesquisarCategorias(): void {
    this.categoriasService.getCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data.filter(categoria => categoria.nome.toLowerCase().includes(this.filtroNome.toLowerCase()));
    });
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.loadCategorias();
  }

  cadastrarCategoria(): void {
    this.router.navigate(['/cadastro-categoria']);
  }

  editarCategoria(categoriaId: number): void {
    this.router.navigate([`/cadastro-categoria/${categoriaId}`]);
  }

  excluirCategoria(categoriaId: number): void {
    this.categoriasService.deleteCategoria(categoriaId).subscribe(() => {
      this.loadCategorias();
    });
  }
}
