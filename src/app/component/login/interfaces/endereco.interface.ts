interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: {
    id: number;
    nome: string;
    sigla: string;
  };
  cep: string;
}
