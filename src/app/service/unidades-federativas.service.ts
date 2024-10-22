import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Serviço responsável por realizar a comunicação com a API de unidades federativas.
 */
export class UnidadesFederativasService {
  private apiUrl = environment.apiUrl + '/unidade-federativa';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obter as unidades federativas
  getUnidadesFederativas(params: { nome?: string }): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();

    // Garantir que params sempre seja um objeto JSON
    const body = { ...params };

    return this.http.post<any[]>(`${this.apiUrl}/find`, body, {
      headers: headers,
    });
  }
}
