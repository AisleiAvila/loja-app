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
import { LoginResponse } from '../component/login/interfaces/login-response.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) {}

  // Método getLogin para fazer login
  getLogin(email: string, senha: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    console.log('URL de login:', url);
    console.log('Email:', email, 'Senha:', senha); // Certifique-se de não logar senhas em produção

    return this.http.post<LoginResponse>(url, { email, senha }).pipe(
      tap((response: LoginResponse) => {
        // Atualiza o localStorage com o authorization
        if (response.authorization) {
          localStorage.setItem('Authorization', response.authorization);
          localStorage.setItem('nomeUsuario', response.nome || '');
          window.location.href = '/home';
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Limpa o localStorage e exibe uma mensagem de erro
        localStorage.removeItem('Authorization');
        localStorage.removeItem('nomeUsuario');
        this.modalService.open('Erro ao fazer login');
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
    console.log('verifyAuthorization - Authorization:', authorization);
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
