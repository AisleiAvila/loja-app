import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecuperarSenhaResponse } from 'src/app/model/recuperarSenhaResponse.model';

@Injectable({
  providedIn: 'root',
})
export class LembrarSenhaService {
  private apiUrl = environment.apiUrl + '/senha/recuperar';

  constructor(private http: HttpClient) {}

  lembrarSenha(email: string): Observable<RecuperarSenhaResponse> {
    return this.http.post<RecuperarSenhaResponse>(`${this.apiUrl}`, { email });
  }
}
