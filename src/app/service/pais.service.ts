import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pais } from '../model/pais.model';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = environment.apiUrl + '/pais';
  private pais: Pais[] = [];

  // Método para obter os países
  getPais(params: { nome?: string }): Observable<Pais[]> {
    const headers = this.authService.getAuthHeaders();
    let queryParams = new HttpParams();

    if (params.nome) {
      queryParams = queryParams.append('nome', params.nome);
    }

    return this.http.get<Pais[]>(`${this.apiUrl}`, {
      headers: headers,
      params: queryParams,
    });
  }
}
