import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional.model';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private apiUrl = 'http://localhost:3000/profissionais';

  constructor(private http: HttpClient) {}

  getProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.apiUrl);
  }

  getProfissional(id: number): Observable<Profissional> {
    return this.http.get<Profissional>(`${this.apiUrl}/${id}`);
  }

  salvarProfissional(profissional: Profissional): Observable<Profissional> {
    if (profissional.id) {
      return this.http.put<Profissional>(
        `${this.apiUrl}/${profissional.id}`,
        profissional
      );
    } else {
      return this.http.post<Profissional>(this.apiUrl, profissional);
    }
  }

  excluirProfissional(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
