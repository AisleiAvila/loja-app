import { Cliente } from './cliente.model';
import { Servico } from './servico.model';
import { Profissional } from './profissional.model';

export interface Agendamento {
  id?: number;
  data: string;
  hora: string;
  cliente?: Cliente;
  servico?: Servico;
  profissional?: Profissional;
  clienteId?: number;
  servicoId?: number;
  profissionalId?: number;
}
