import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor responsável pela autenticação das requisições HTTP.
 *
 * Papel Principal:
 * - Intercepta todas as requisições HTTP da aplicação
 * - Adiciona automaticamente o token JWT no header Authorization
 * - Trata erros de autenticação (401) e autorização (403)
 * - Redireciona para o login quando o token é inválido ou expirado
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Construtor do interceptor de autenticação
   * @param router - Serviço de roteamento do Angular para redirecionamento
   */
  constructor(private router: Router) {}

  /**
   * Intercepta todas as requisições HTTP para adicionar o token de autenticação
   * e tratar erros de autorização
   *
   * @param request - A requisição HTTP original
   * @param next - O manipulador da próxima requisição na cadeia
   * @returns Observable da resposta HTTP
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtém o token de autorização do localStorage
    const token = localStorage.getItem('Authorization');

    // Se houver token, clona a requisição e adiciona o header de autorização
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continua a cadeia de interceptação e trata erros
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se o erro for 401 (Não Autorizado) ou 403 (Proibido)
        if (error.status === 401 || error.status === 403) {
          // Remove o token e redireciona para o login
          localStorage.removeItem('Authorization');
          this.router.navigate(['/login']);
        }
        // Propaga o erro para ser tratado por outros handlers
        return throwError(() => error);
      })
    );
  }
}
