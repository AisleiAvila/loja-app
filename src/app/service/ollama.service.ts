import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private apiUrl = environment.apiUrl + '/chat/generate';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAnswer(question: string): Observable<string> {
    const headers = this.authService.getAuthHeaders();

    const body = {
      model: 'llama3',
      prompt: question,
    };

    return this.http
      .post(this.apiUrl, body, {
        headers: headers,
        responseType: 'text', // Resposta será em formato texto (fluxo contínuo)
        observe: 'body', // Observar diretamente o corpo da resposta
      })
      .pipe(
        map((response) => {
          // Aqui você processa a string de texto para construir a resposta final
          const fragments = response
            .split('\n') // Quebra em linhas
            .map((line) => line.trim()) // Remove espaços
            .filter((line) => line.length > 0) // Remove linhas vazias
            .map((line) => JSON.parse(line)); // Converte cada linha para JSON

          // Concatena todas as respostas fragmentadas
          const fullResponse = fragments.map((f) => f.response).join('');
          return fullResponse;
        })
      );
  }
}
