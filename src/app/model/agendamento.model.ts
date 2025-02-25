export interface Agendamento {
  id?: number;
  cliente_id: number;
  cliente_nome?: string;
  prestador_id: number;
  prestador_nome?: string;
  servico_id: number;
  servico_nome?: string;
  data_inicio: string;
  hora_inicio: string;
  duracao_horas: number;
  status: 'AGENDADO' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO';
  valor_total: number;
  observacoes?: string;
  created_at?: string;
  updated_at?: string;
}
