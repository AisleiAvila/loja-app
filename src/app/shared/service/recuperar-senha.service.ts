import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenResponse } from 'src/app/component/login/interfaces/token-response.interface';
import { ValidarResetTokenRequest } from 'src/app/component/login/interfaces/validar-reset-token-request.interface';

@Injectable({
  providedIn: 'root',
})
export class RecuperacaoSenhaService {
  private apiUrl = 'http://localhost:8080/senha'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  validarToken(token: string): Observable<TokenResponse> {
    const request: ValidarResetTokenRequest = { token };
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/validar-reset-token`, request)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente ou na rede
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro no lado do servidor
      console.error(
        `Código do erro retornado pelo servidor: ${error.status}, ` +
          `corpo do erro: ${error.error}`
      );
    }
    // Retorna um observable com uma mensagem de erro amigável ao usuário
    return throwError(
      'Algo deu errado; por favor, tente novamente mais tarde.'
    );
  }
}
