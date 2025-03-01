import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento } from '../models/agendamento.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private apiUrl = 'http://localhost:3000/agendamentos';

  constructor(private http: HttpClient) {}

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  getAgendamentosPorDia(): Observable<{ [key: string]: Agendamento[] }> {
    return this.getAgendamentos().pipe(
      map((agendamentos) => {
        // Group by day of week
        const grouped: { [key: string]: Agendamento[] } = {};

        agendamentos.forEach((agendamento) => {
          const date = new Date(agendamento.data);
          const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format

          if (!grouped[dayKey]) {
            grouped[dayKey] = [];
          }

          grouped[dayKey].push(agendamento);
        });

        return grouped;
      })
    );
  }

  salvarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    if (agendamento.id) {
      return this.http.put<Agendamento>(
        `${this.apiUrl}/${agendamento.id}`,
        agendamento
      );
    } else {
      return this.http.post<Agendamento>(this.apiUrl, agendamento);
    }
  }

  excluirAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
