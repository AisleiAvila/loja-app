import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../interfaces/login-response.interface';
import { ModalCommunicationService } from './modal-communication.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Serviço responsável por realizar a autenticação do usuário.
 */
export class LoginService {
  private apiUrl = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalCommunicationService,
    private translate: TranslateService
  ) {}

  // Método getLogin para fazer login
  getLogin(email: string, senha: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;

    return this.http.post<LoginResponse>(url, { email, senha }).pipe(
      tap((response: LoginResponse) => {
        // Atualiza o localStorage com o authorization
        if (response.authorization) {
          localStorage.setItem('Authorization', response.authorization);
          localStorage.setItem('nomeUsuario', response.nome || '');
          localStorage.setItem('perfil', response.perfil.toUpperCase() || '');
          window.location.href = '/home';
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Limpa o localStorage e exibe uma mensagem de erro
        localStorage.removeItem('Authorization');
        localStorage.removeItem('nomeUsuario');
        this.translate.get('ERRO_LOGIN').subscribe((texto: string) => {
          this.modalService.abrirModal(texto, 'Erro');
        });
        let errorMessage = 'Erro desconhecido ao fazer login';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro do lado do cliente: ${error.error.message}`;
        } else {
          errorMessage = `Erro do servidor: ${error.status}, mensagem: ${error.message}`;
        }
        console.error('Erro:', errorMessage, 'Detalhes:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Método para verificar a autorização
  verifyAuthorization(): Observable<boolean> {
    const authorization = localStorage.getItem('Authorization');
    if (authorization) {
      const headers = new HttpHeaders().set('Authorization', authorization);
      return this.http
        .get<boolean>(`${this.apiUrl}/verify-authorization`, { headers })
        .pipe(
          map((response) => !!response),
          catchError((error: HttpErrorResponse) => {
            localStorage.removeItem('Authorization');
            localStorage.removeItem('nomeUsuario');
            if (error.status === 403) {
              console.error(
                'Acesso negado. Token expirado ou inválido.' + error.message
              );
            } else {
              console.error('Erro ao verificar autorização:', error.message);
            }
            return throwError(() => false);
          })
        );
    } else {
      return throwError(() => false);
    }
  }
}
