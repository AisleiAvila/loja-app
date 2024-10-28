import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenResponse } from 'src/app/component/login/interfaces/token-response.interface';

@Injectable({
  providedIn: 'root',
})
export class RecuperacaoSenhaService {
  private apiUrl = 'http://localhost:8080/senha'; // Substitua pela URL da sua API

  constructor(private http: HttpClient) {}

  validarToken(token: string): Observable<TokenResponse> {
    return this.http
      .get<TokenResponse>(`${this.apiUrl}/validar-reset-token/${token}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    alert('Erro ao validar token: ' + JSON.stringify(error));
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
