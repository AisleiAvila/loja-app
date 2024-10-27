import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LembrarSenhaService {
  private apiUrl = environment.apiUrl + '/senha/recuperar';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Authorization');
    if (!token) {
      throw new Error('Token de autorização não encontrado.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  lembrarSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email });
  }
}
