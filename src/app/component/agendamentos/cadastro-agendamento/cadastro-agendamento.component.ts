import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgendamentoService } from '../../../service/agendamento.service';
import { Agendamento } from '../../../model/agendamento.model';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class CadastroAgendamentoComponent implements OnInit {
  agendamento: Agendamento = {
    cliente_id: 0,
    prestador_id: 0,
    servico_id: 0,
    data_inicio: '',
    hora_inicio: '',
    duracao_horas: 1,
    status: 'AGENDADO',
    valor_total: 0,
  };

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.agendamentoService
        .getAgendamentoById(id)
        .subscribe((agendamento) => (this.agendamento = agendamento));
    }
  }

  salvar() {
    const operacao = this.agendamento.id
      ? this.agendamentoService.updateAgendamento(this.agendamento)
      : this.agendamentoService.createAgendamento(this.agendamento);

    operacao.subscribe({
      next: () => {
        this.snackBar.open('Agendamento salvo com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/agendamentos']);
      },
      error: (error) => {
        console.error('Erro ao salvar agendamento:', error);
        this.snackBar.open('Erro ao salvar agendamento', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  cancelar() {
    this.router.navigate(['/agendamentos']);
  }
}
