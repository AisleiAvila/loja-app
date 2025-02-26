import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organizacao } from '../model/organizacao.model';
import { Organizacoes } from '../model/organizacoes.model';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Serviço responsável por realizar a comunicação com a API de organizações.
 */
export class OrganizacoesService {
  private apiUrl = environment.apiUrl + '/organizacao';
  // private organizacoes: any[] = [];

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  getOrganizacaoById(id: number): Observable<Organizacao> {
    const headers = this.authService.getAuthHeaders();

    return this.http.get<Organizacao>(`${this.apiUrl}/detail/${id}`, {
      headers: headers,
    });
  }

  // Método para obter usuários com parâmetros opcionais
  getOrganizacoes(params: {
    id?: number;
    nome?: string;
    nif?: string;
    email?: string;
    limit?: number;
    offset?: number;
  }): Observable<Organizacoes> {
    const headers = this.authService.getAuthHeaders();

    // Garantir que params sempre seja um objeto JSON
    const body = { ...params };

    return this.http.post<Organizacoes>(`${this.apiUrl}/find`, body, {
      headers: headers,
    });
  }

  saveOrganizacao(organizacao: Organizacao): Observable<Organizacao> {
    const headers = this.authService.getAuthHeaders();

    return this.http
      .put<Organizacao>(`${this.apiUrl}`, organizacao, { headers: headers })
      .pipe(
        catchError((error) => {
          let errorMessage =
            'Erro ao salvar usuário. Por favor, tente novamente mais tarde.';

          // Verificar se a resposta é JSON ou texto
          if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
          } else {
            // Erro do lado do servidor
            if (error.error && typeof error.error === 'string') {
              try {
                const parsedError = JSON.parse(error.error);
                if (parsedError.message) {
                  errorMessage = parsedError.message;
                }
              } catch (e) {
                console.log('Erro ao salvar usuário:', e);
                errorMessage = error.error;
              }
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
          }

          console.error('Erro ao salvar usuário:', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  updateOrganizacao(usuario: Organizacao): Observable<Organizacao> {
    const headers = this.authService.getAuthHeaders();

    return this.http
      .patch<Organizacao>(this.apiUrl, usuario, { headers: headers })
      .pipe(
        catchError((error) => {
          let errorMessage =
            'Erro ao atualizar usuário. Por favor, tente novamente mais tarde.';

          // Verificar se a resposta é JSON ou texto
          if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
          } else {
            // Erro do lado do servidor
            if (error.error && typeof error.error === 'string') {
              try {
                const parsedError = JSON.parse(error.error);
                if (parsedError.message) {
                  errorMessage = parsedError.message;
                }
              } catch (e) {
                console.log('Erro ao atualizar usuário:', e);
                errorMessage = error.error;
              }
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
          }

          console.error('Erro ao atualizar usuário:', errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  deleteOrganizacao(params: { id: number }): Observable<Organizacao> {
    const headers = this.authService.getAuthHeaders();

    // Incluindo o ID na URL
    const url = `${this.apiUrl}/${params.id}`;
    console.log('url', url);

    return this.http.delete<Organizacao>(url, { headers: headers }).pipe(
      catchError((error) => {
        let errorMessage =
          'Erro ao excluir usuário. Por favor, tente novamente mais tarde.';

        // Verificar se a resposta é JSON ou texto
        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Erro do lado do servidor
          if (error.error && typeof error.error === 'string') {
            try {
              const parsedError = JSON.parse(error.error);
              if (parsedError.message) {
                errorMessage = parsedError.message;
              }
            } catch (e) {
              console.log('Erro ao excluir usuário:', e);
              errorMessage = error.error;
            }
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
        }

        console.error('Erro ao excluir usuário:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
