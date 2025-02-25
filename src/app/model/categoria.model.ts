export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  status?: string;
  requer_certificacao?: boolean;
  tipo_certificacao?: string;
  experiencia_minima_meses?: number;
  nivel_risco?: string;
  seguro_obrigatorio?: boolean;
  valor_base_hora?: number;
  data_criacao?: Date;
  data_atualizacao?: Date;
  url_imagem?: string;
  palavras_chave?: string[];
  horas_minimas_agendamento?: number;
  horas_cancelamento_gratis?: number;
  percentual_comissao?: number;
  documentos_necessarios?: string[];
}
