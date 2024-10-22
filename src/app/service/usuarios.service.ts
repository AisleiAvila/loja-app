import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Serviço responsável por realizar a comunicação com a API de usuarios.
 */
export class UsuariosService {
  private apiUrl = environment.apiUrl + '/usuario';
  private usuarios: any[] = [];

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  // Método para obter as unidades usuarios filtradas
  getFilteredUsuarios(filterValue: string): Observable<any[]> {
    this.modalService.open('UsuariosService.getUsuarios');
    return of(
      this.usuarios.filter((uf) =>
        uf.nome.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
      )
    );
  }

  getUsuarioById(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();

    return this.http.get<any>(`${this.apiUrl}/detail/${id}`, {
      headers: headers,
    });
  }

  // Método para obter usuários com parâmetros opcionais
  getUsuarios(params: {
    nome?: string;
    id?: number;
    email?: string;
    dataNascimento?: string;
    limit?: number;
    offset?: number;
  }): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();

    // Garantir que params sempre seja um objeto JSON
    const body = { ...params };

    return this.http.post<any[]>(`${this.apiUrl}/find`, body, {
      headers: headers,
    });
  }

  saveUsuario(usuario: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    alert('saveUsuario --> ' + this.apiUrl);

    return this.http
      .put<any>(`${this.apiUrl}`, usuario, { headers: headers })
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

  updateUsuario(usuario: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();

    return this.http
      .patch<any>(this.apiUrl, usuario, { headers: headers })
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

  deleteUsuario(params: { id: number }): Observable<any> {
    const headers = this.authService.getAuthHeaders();

    // Incluindo o ID na URL
    const url = `${this.apiUrl}/${params.id}`;
    console.log('url', url);

    return this.http.delete<any>(url, { headers: headers }).pipe(
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
