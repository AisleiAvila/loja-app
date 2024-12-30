import { Usuario } from './usuario.model';

export interface UsuarioResponseDTO {
  usuarios: Usuario[];
  totalRecords: number;
}
