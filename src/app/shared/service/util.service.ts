import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private encryptionKey = 'my-secret-key-loja';

  constructor() {}

  validarEmail(email: string): boolean {
    if (!email) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  descriptografarSenha(senhaCriptografada: string): string {
    if (!senhaCriptografada) {
      return '';
    }

    const bytes = CryptoJS.AES.decrypt(senhaCriptografada, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
