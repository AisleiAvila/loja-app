import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { OllamaService } from 'src/app/service/ollama.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateModule,
  ],
})
export class ChatComponent {
  pergunta = '';
  resposta: string | null = null;
  fullResponse: string | null = null; // Resposta completa da API
  historico: { pergunta: string; resposta: string }[] = []; // Histórico de perguntas e respostas
  isLoading = false;

  constructor(private ollamaService: OllamaService) {}

  fazerPergunta() {
    if (this.pergunta) {
      this.isLoading = true; // Ativa o spinner
      this.ollamaService.getAnswer(this.pergunta).subscribe(
        (data) => {
          console.log('Resposta da API:', data);
          // this.resposta = data.answer; // Ajuste conforme a estrutura da resposta da API
          this.fullResponse = data; // Armazena a resposta completa
          this.historico.push({
            pergunta: this.pergunta,
            resposta: this.fullResponse,
          }); // Adiciona ao histórico
          this.pergunta = ''; // Limpa o campo de pergunta
          this.isLoading = false; // Desativa o spinner
        },
        (error) => {
          console.error('Erro ao obter resposta da API:', error);
          this.resposta = 'Erro ao obter resposta. Tente novamente mais tarde.';
          this.isLoading = false; // Desativa o spinner independente do resultado
        }
      );
    }
  }
}
