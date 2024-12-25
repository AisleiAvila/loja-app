import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';

/**
 * Component for displaying a message modal.
 */
@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit {
  /**
   * The title of the modal.
   */
  @Input() title: string | undefined;

  /**
   * The message to be displayed in the modal.
   */
  @Input() message: string | undefined;

  constructor(
    @Optional() public activeModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private modalService: ModalCommunicationService
  ) {}

  /**
   * Opens the modal with the specified message and title.
   * @param message The message to display in the modal.
   * @param title The title of the modal.
   */
  abrirModal(message: string, title: string): void {
    const modalRef = this.ngbModal.open(MessageModalComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      backdropClass: 'light-blue-backdrop',
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  /**
   * Initializes the component and registers it with the modal service.
   */
  ngOnInit(): void {
    this.modalService.registerModalComponent(this);
  }
}
