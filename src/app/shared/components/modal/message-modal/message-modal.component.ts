import { Component, Input, OnInit, Optional } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCommunicationService } from '../../../../service/modal-communication.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() message: string | undefined;

  constructor(
    @Optional() public activeModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private modalService: ModalCommunicationService
  ) {}

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

  ngOnInit(): void {
    this.modalService.registerModalComponent(this);
  }
}
