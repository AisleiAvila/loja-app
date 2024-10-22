import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Serviço responsável por realizar a comunicação com a API de perfis.
 */
export class PerfisService {
  private apiUrl = environment.apiUrl + '/perfis';
  private perfis: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obter os perfis
  getPerfis(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();

    return this.http.get<any[]>(`${this.apiUrl}`, { headers: headers });
  }
}
