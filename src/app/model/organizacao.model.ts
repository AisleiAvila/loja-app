export interface Organizacao {
  id: number;
  nome: string;
  nif: string;
  email: string;
  website: string;
  setorAtividade: string;
  missao: string;
  representanteLegal: string;
  cargo: string;
  numeroRegistoComercial: string;
  dataRegisto: string | null;
}
