import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Estado } from '../model/estado.model';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private apiUrl = environment.apiUrl + '/estado';
  // private estados: Estado[] = [];

  // getEstado(id: number): Observable<Estado> {
  //   const headers = this.authService.getAuthHeaders();
  //   this.apiUrl = this.apiUrl + '/' + id;
  //   alert('Chamando endpoint com id: ' + id + ' URL: ' + this.apiUrl); // Log para verificar o ID


  //   return this.http
  //     .get<Estado>(`${this.apiUrl}`, {
  //       headers: headers,
  //     })
  //     .pipe(
  //       map((response) => {
  //         console.log('Resposta do endpoint:', response); // Log para verificar a resposta
  //         return response;
  //       }),
  //       catchError((error) => {
  //         console.error('Erro ao chamar endpoint:', error); // Log para verificar erros
  //         return of(null);
  //       })
  //     );
  // }

  getEstadosByPaisId(paisId: number): Observable<Estado[]> {

    if (!paisId) {
      return of([]);
    }

    const headers = this.authService.getAuthHeaders();
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pais_id', paisId.toString());

    return this.http.get<Estado[]>(`${this.apiUrl}`, {
      headers: headers,
      params: queryParams,
    });
  }

  detailEstado(id: number): Observable<Estado> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Estado>(`${this.apiUrl}/${id}`, { headers: headers });
  }

  findEstados(nome?: string, pais_id?: number): Observable<Estado[]> {
    const headers = this.authService.getAuthHeaders();
    let queryParams = new HttpParams();

    if (nome) {
      queryParams = queryParams.append('nome', nome);
    }
    if (pais_id) {
      queryParams = queryParams.append('pais_id', pais_id.toString());
    }

    const fullUrl = `${this.apiUrl}`; // Apenas a base, sem parâmetros manuais

    console.log('Chamando endpoint findEstados com URL:', fullUrl, 'e params:', queryParams.toString()); // Log para depuração

    return this.http
      .get<Estado[]>(fullUrl, { // Agora a URL está correta
        headers: headers,
        params: queryParams,
      })
      .pipe(
        map((response) => {
          console.log('Resposta do endpoint findEstados:', response);
          return response || [];
        }),
        catchError((error) => {
          console.error('Erro ao chamar endpoint findEstados:', error);
          return of([]);
        })
      );
  }

}
