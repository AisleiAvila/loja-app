import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <div class="modal-container">
      <div class="modal-header">
        <h2 mat-dialog-title>
          <mat-icon class="header-icon">{{
            data.titulo.toLowerCase() === 'erro' ? 'error_outline' : 'info'
          }}</mat-icon>
          {{ data.titulo }}
        </h2>
        <button mat-icon-button (click)="fecharModal()" class="close-button">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <mat-dialog-content>
        <p class="message-text">{{ data.mensagem }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button
          mat-flat-button
          [color]="data.titulo.toLowerCase() === 'erro' ? 'warn' : 'primary'"
          (click)="fecharModal()"
        >
          Fechar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .modal-container {
        padding: 24px;
        border-radius: 8px;
        min-width: 320px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        background-color: #f5f5f5;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        margin: -24px -24px 16px -24px;
        position: relative;
      }

      h2 {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 1.25rem;
        font-weight: 500;
        color: #333;
        padding-right: 48px; // Espaço para o botão fechar
      }

      .header-icon {
        margin-right: 8px;
        color: inherit;
      }

      .close-button {
        position: absolute;
        right: 12px; // Ajustado
        top: 12px; // Posição fixa do topo
        width: 36px;
        height: 36px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        transition: all 0.2s ease;
        margin: 0; // Remove margens

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
          color: #333;
        }

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
          line-height: 20px;
        }
      }

      .message-text {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5;
        color: #666;
        word-wrap: break-word;
        white-space: pre-wrap;
      }

      mat-dialog-content {
        flex: 1;
        margin: 0;
        padding: 0 24px;
        max-height: none;
        overflow: visible;
      }

      mat-dialog-actions {
        margin: 24px -24px -24px -24px;
        padding: 16px 24px;
        background-color: #f5f5f5;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        min-height: 52px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      button[mat-flat-button] {
        min-width: 100px;
        height: 36px; // Altura fixa para o botão
        line-height: 36px;
        padding: 0 16px;
        margin: 0; // Remove margens
        text-transform: uppercase;
        font-weight: 500;
      }
    `,
  ],
})
export class MessageModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string; titulo: string }
  ) {
    dialogRef.addPanelClass('custom-dialog-container');
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}
