import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categorias: Categoria[] = [
    { id: 1, nome: 'Categoria 1' },
    { id: 2, nome: 'Categoria 2' }
  ];

  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias);
  }

  getCategoriaById(id: number): Observable<Categoria> {
    const categoria = this.categorias.find(cat => cat.id === id);
    return of(categoria!);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    categoria.id = this.categorias.length + 1;
    this.categorias.push(categoria);
    return of(categoria);
  }

  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    const index = this.categorias.findIndex(cat => cat.id === id);
    if (index !== -1) {
      this.categorias[index] = categoria;
    }
    return of(categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    this.categorias = this.categorias.filter(cat => cat.id !== id);
    return of();
  }
}
