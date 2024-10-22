import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
}
