import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/service/auth.service';
import { Perfil } from '../model/perfil.model';

@Injectable({
  providedIn: 'root',
})

/**
 * Serviço responsável por realizar a comunicação com a API de perfis.
 */
export class PerfisService {
  private apiUrl = environment.apiUrl + '/perfis';
  private perfis: Perfil[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obter os perfis
  getPerfis(): Observable<Perfil[]> {
    const headers = this.authService.getAuthHeaders();

    return this.http.get<Perfil[]>(`${this.apiUrl}`, { headers: headers });
  }
}
