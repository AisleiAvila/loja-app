import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../model/estado.model';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private apiUrl = 'http://api.example.com';

  constructor(private http: HttpClient) {}

  obterEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }

  obterEstadoPorId(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/estados/${id}`);
  }

  adicionarEstado(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(`${this.apiUrl}/estados`, estado);
  }

  atualizarEstado(id: number, estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.apiUrl}/estados/${id}`, estado);
  }

  deletarEstado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estados/${id}`);
  }

  obterEstadosPorPais(paisId: number, usuarioId: number): Observable<Estado[]> {
    return this.http.get<Estado[]>(
      `${this.apiUrl}/estados/pais/${paisId}/usuario/${usuarioId}`
    );
  }
}
