import { Injectable } from '@angular/core';
import { MessageModalComponent } from '../shared/components/modal/message-modal/message-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalCommunicationService {

  private modalInstance: MessageModalComponent | undefined;

  public registerModalComponent(modalInstance: MessageModalComponent): void {
    this.modalInstance = modalInstance;
  }

  abrirModal(message: string, title: string): void {
    if (this.modalInstance) {
        this.modalInstance.abrirModal(message, title);
    } else {
        console.error("modalInstance is not initialized.");
    }
  }
}
