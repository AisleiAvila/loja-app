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

  lembrarSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { email });
  }
}
