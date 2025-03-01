import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { AgendaService } from '../../services/agenda.service';
import { ClienteService } from '../../services/cliente.service';
import { ServicoService } from '../../services/servico.service';
import { ProfissionalService } from '../../services/profissional.service';

import { Agendamento } from '../../models/agendamento.model';
import { Cliente } from '../../models/cliente.model';
import { Servico } from '../../models/servico.model';
import { Profissional } from '../../models/profissional.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  // Data properties
  agendamentos: Agendamento[] = [];
  agendamentosPorDia: Record<string, Agendamento[]> = {};
  diasSemana: string[] = [];

  // Form properties
  exibirModalAgendamento = false;
  formAgendamento: FormGroup;
  modoEdicao = false;
  agendamentoSelecionado: Agendamento | null = null;

  // Related data
  clientes: Cliente[] = [];
  servicos: Servico[] = [];
  profissionais: Profissional[] = [];

  constructor(
    private agendaService: AgendaService,
    private clienteService: ClienteService,
    private servicoService: ServicoService,
    private profissionalService: ProfissionalService,
    private messageService: MessageService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    // Initialize form
    this.formAgendamento = this.fb.group({
      id: [null],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      clienteId: [null, Validators.required],
      servicoId: [null, Validators.required],
      profissionalId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregarAgendamentos();
    this.carregarClientes();
    this.carregarServicos();
    this.carregarProfissionais();
  }

  carregarAgendamentos(): void {
    this.agendaService.getAgendamentosPorDia().subscribe({
      next: (agendamentosPorDia) => {
        this.agendamentosPorDia = agendamentosPorDia;
        this.diasSemana = Object.keys(agendamentosPorDia).sort();
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos', erro);
        // Using error handling with translation fallback
        const errorMsg =
          this.translate.instant('ERRO_CARREGAR_AGENDAMENTOS') ||
          'Erro ao carregar agendamentos';
        const errorTitle = this.translate.instant('LABLE_ERRO') || 'Erro';

        this.messageService.add({
          severity: 'error',
          summary: errorTitle,
          detail: errorMsg,
        });
      },
    });
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => (this.clientes = clientes),
      error: (erro) => console.error('Erro ao carregar clientes', erro),
    });
  }

  carregarServicos(): void {
    this.servicoService.getServicos().subscribe({
      next: (servicos) => (this.servicos = servicos),
      error: (erro) => console.error('Erro ao carregar serviços', erro),
    });
  }

  carregarProfissionais(): void {
    this.profissionalService.getProfissionais().subscribe({
      next: (profissionais) => (this.profissionais = profissionais),
      error: (erro) => console.error('Erro ao carregar profissionais', erro),
    });
  }

  formatarData(dataString: string): string {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
      });
    } catch (error) {
      console.error('Erro ao formatar data', error);
      return dataString || '';
    }
  }

  exibirModal(agendamento?: Agendamento): void {
    this.modoEdicao = !!agendamento;
    this.agendamentoSelecionado = agendamento || null;

    if (agendamento) {
      try {
        // Converter string para objeto Date para o formulário
        const dataObj = new Date(agendamento.data);

        this.formAgendamento.patchValue({
          id: agendamento.id,
          data: dataObj,
          hora: agendamento.hora,
          clienteId: agendamento.cliente?.id || agendamento.clienteId,
          servicoId: agendamento.servico?.id || agendamento.servicoId,
          profissionalId:
            agendamento.profissional?.id || agendamento.profissionalId,
        });
      } catch (error) {
        console.error('Erro ao preencher formulário', error);
        this.formAgendamento.reset();
      }
    } else {
      this.formAgendamento.reset();
    }

    this.exibirModalAgendamento = true;
  }

  fecharModal(): void {
    this.exibirModalAgendamento = false;
    this.formAgendamento.reset();
  }

  salvarAgendamento(): void {
    if (this.formAgendamento.invalid) {
      const warningMsg =
        this.translate.instant('LABLE_CAMPOS_OBRIGATORIOS') ||
        'Por favor, preencha todos os campos obrigatórios';
      const warningTitle = this.translate.instant('LABLE_ATENCAO') || 'Atenção';

      this.messageService.add({
        severity: 'warn',
        summary: warningTitle,
        detail: warningMsg,
      });
      return;
    }

    try {
      const valores = this.formAgendamento.value;
      // Formatar a data para string ISO
      const data =
        valores.data instanceof Date
          ? valores.data.toISOString().split('T')[0]
          : valores.data;

      const agendamento: Agendamento = {
        ...valores,
        data: data,
        cliente: this.clientes.find((c) => c.id === valores.clienteId),
        servico: this.servicos.find((s) => s.id === valores.servicoId),
        profissional: this.profissionais.find(
          (p) => p.id === valores.profissionalId
        ),
      };

      this.agendaService.salvarAgendamento(agendamento).subscribe({
        next: () => {
          const msgKey = this.modoEdicao
            ? 'AGENDAMENTO_ATUALIZADO'
            : 'AGENDAMENTO_CRIADO';
          const successMsg =
            this.translate.instant(msgKey) ||
            (this.modoEdicao
              ? 'Agendamento atualizado com sucesso'
              : 'Agendamento criado com sucesso');
          const successTitle =
            this.translate.instant('LABLE_SUCESSO') || 'Sucesso';

          this.messageService.add({
            severity: 'success',
            summary: successTitle,
            detail: successMsg,
          });

          this.fecharModal();
          this.carregarAgendamentos();
        },
        error: (erro) => {
          console.error('Erro ao salvar agendamento', erro);
          const errorMsg =
            this.translate.instant('ERRO_SALVAR_AGENDAMENTO') ||
            'Erro ao salvar agendamento';
          const errorTitle = this.translate.instant('LABLE_ERRO') || 'Erro';

          this.messageService.add({
            severity: 'error',
            summary: errorTitle,
            detail: errorMsg,
          });
        },
      });
    } catch (error) {
      console.error('Erro ao processar dados do formulário', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao processar dados do formulário',
      });
    }
  }

  editarAgendamento(agendamento: Agendamento): void {
    this.exibirModal(agendamento);
  }

  excluirAgendamento(agendamento: Agendamento): void {
    if (!agendamento.id) return;

    this.agendaService.excluirAgendamento(agendamento.id).subscribe({
      next: () => {
        const successMsg =
          this.translate.instant('AGENDAMENTO_EXCLUIDO') ||
          'Agendamento excluído com sucesso';
        const successTitle =
          this.translate.instant('LABLE_SUCESSO') || 'Sucesso';

        this.messageService.add({
          severity: 'success',
          summary: successTitle,
          detail: successMsg,
        });
        this.carregarAgendamentos();
      },
      error: (erro) => {
        console.error('Erro ao excluir agendamento', erro);
        const errorMsg =
          this.translate.instant('ERRO_EXCLUIR_AGENDAMENTO') ||
          'Erro ao excluir agendamento';
        const errorTitle = this.translate.instant('LABLE_ERRO') || 'Erro';

        this.messageService.add({
          severity: 'error',
          summary: errorTitle,
          detail: errorMsg,
        });
      },
    });
  }
}
