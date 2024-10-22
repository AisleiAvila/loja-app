import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable()
/**
 * Interceptor responsável por adicionar o token de autorização nas requisições HTTP.
 */
export class AuthInterceptor implements HttpInterceptor {
  private isVerifyingAuthorization = false;

  constructor(private loginService: LoginService) {}

  /**
   * Método responsável por interceptar as requisições HTTP.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verifica se a requisição é para autenticação
    if (request.url.includes('/auth/login') || this.isVerifyingAuthorization) {
      return next.handle(request);
    }

    const authorization = localStorage.getItem('Authorization');
    // Verifica se o usuário está logado
    if (authorization) {
      // Verifica se a aplicação está verificando a autor
      if (!this.isVerifyingAuthorization) {
        // Verifica se o token de autorização está expirado
        this.isVerifyingAuthorization = true;
        const clonedRequest = request.clone({
          setHeaders: { Authorization: `Bearer ${authorization}` },
        });
        return next.handle(clonedRequest);
      } else {
        return EMPTY;
      }
    } else {
      // Redireciona o usuário para a tela de login se não estiver logado
      window.location.href = '/login';
      return EMPTY;
    }
  }
}
