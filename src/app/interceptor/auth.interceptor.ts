import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isVerifyingAuthorization = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Verifica se a requisição é para autenticação ou arquivos de tradução
    if (
      request.url.includes('/auth/login') ||
      request.url.includes('/assets/i18n/') ||
      this.isVerifyingAuthorization
    ) {
      return next.handle(request);
    }

    const authorization = localStorage.getItem('Authorization');
    // Verifica se o usuário está logado
    if (authorization) {
      // Verifica se a aplicação está verificando a autorização
      if (!this.isVerifyingAuthorization) {
        this.isVerifyingAuthorization = true;
        const clonedRequest = request.clone({
          setHeaders: { Authorization: `Bearer ${authorization}` },
        });
        return next.handle(clonedRequest).pipe(
          finalize(() => {
            this.isVerifyingAuthorization = false;
          })
        );
      } else {
        return EMPTY;
      }
    } else {
      // Redireciona o usuário para a tela de login se não estiver logado
      if (!request.url.includes('/login')) {
        window.location.href = '/login';
      }
      return EMPTY;
    }
  }
}
