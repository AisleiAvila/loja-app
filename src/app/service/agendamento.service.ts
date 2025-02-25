import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agendamento } from '../model/agendamento.model';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private apiUrl = environment.apiUrl + '/agendamentos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAgendamentos(params: any = {}): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/find`, params, { headers });
  }

  getAgendamentoById(id: number): Observable<Agendamento> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Agendamento>(`${this.apiUrl}/${id}`, { headers });
  }

  createAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Agendamento>(this.apiUrl, agendamento, { headers });
  }

  updateAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Agendamento>(
      `${this.apiUrl}/${agendamento.id}`,
      agendamento,
      { headers }
    );
  }

  deleteAgendamento(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
