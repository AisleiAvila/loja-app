export interface Endereco {
  id: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  // cidadeId?: {
  //   id: number;
  //   nome: string;
  //   estadoId: {
  //     id: number;
  //     nome: string;
  //     paisId: {
  //       id: number;
  //       nome: string;
  //     };
  //   };
  // };
  cidade_id?: {
    id: number;
    nome: string;
    estado_id: {
      id: number;
      nome: string;
      pais_id: {
        id: number;
        nome: string;
      };
    };
  };
  cep: string;
}
