import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cidade } from '../model/cidade.model';
import { AuthService } from '../shared/service/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  private apiUrl = environment.apiUrl + '/cidade';
  private estado: Cidade[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obter os países
  getCidade(nome?: string, estadoId?: number): Observable<Cidade[]> {
    const headers = this.authService.getAuthHeaders();
    let queryParams = new HttpParams();

    // Se não tiver paisId, retorna array vazio
    if (!estadoId) {
      return of([]);
    }

    if (nome) {
      queryParams = queryParams.append('nome', nome);
    }
    if (estadoId) {
      queryParams = queryParams.append('estado_id', estadoId.toString());
    }

    return this.http
      .get<Cidade[]>(`${this.apiUrl}`, {
        headers: headers,
        params: queryParams,
      })
      .pipe(
        map((response) => response || []), // garante que sempre retorna um array
        catchError(() => of([])) // em caso de erro retorna array vazio
      );
  }

}
