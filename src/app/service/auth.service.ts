import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getPerfilUsuario(): string {
    return this.getPerfilUsuarioLogado();
  }

  isAdministrador(): boolean {
    return this.getPerfilUsuario() === 'ADMINISTRADOR';
  }

  isGerente(): boolean {
    return this.getPerfilUsuario() === 'GERENTE';
  }

  temPerfilPermitido(perfisPermitidos: string[]): boolean {
    const perfilUsuario = this.getPerfilUsuario();
    return perfisPermitidos.includes(perfilUsuario);
  }

  private getUsuarioLogado() {
    const usuarioStr = localStorage.getItem('nomeUsuario');
    if (usuarioStr !== null && usuarioStr != undefined) {
      return JSON.parse(usuarioStr);
    }
    return null;
  }

  private getPerfilUsuarioLogado() {
    const perfilUsuarioStr = localStorage.getItem('perfil');
    if (perfilUsuarioStr !== null && perfilUsuarioStr != undefined) {
      return perfilUsuarioStr;
    }
    return '';
  }
}
