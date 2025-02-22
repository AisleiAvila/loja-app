import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../shared/components/modal/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalCommunicationService {
  constructor(private dialog: MatDialog) {}

  abrirModal(mensagem: string, titulo: string): void {
    this.dialog.open(MessageModalComponent, {
      width: '400px', // Aumentado de 300px para 400px
      maxWidth: '90vw', // Limita a largura máxima em telas menores
      maxHeight: '90vh',
      data: { mensagem, titulo },
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });
  }
}
