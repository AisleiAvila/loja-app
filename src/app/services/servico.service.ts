import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico.model';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private apiUrl = 'http://localhost:3000/servicos';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  getServico(id: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.apiUrl}/${id}`);
  }

  salvarServico(servico: Servico): Observable<Servico> {
    if (servico.id) {
      return this.http.put<Servico>(`${this.apiUrl}/${servico.id}`, servico);
    } else {
      return this.http.post<Servico>(this.apiUrl, servico);
    }
  }

  excluirServico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
