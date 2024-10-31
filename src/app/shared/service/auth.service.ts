import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Substitua pela URL da sua API

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

  revogarToken(token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/revoke`, {}, { headers });
  }
}
