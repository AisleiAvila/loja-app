import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, startWith } from 'rxjs/operators';
import { UnidadesFederativasService } from 'src/app/service/unidades-federativas.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../../shared/components/modal/message-modal/message-modal.component';

@Component({
  selector: 'app-unidades-federativas',
  templateUrl: './unidades-federativas.component.html',
  styleUrls: ['./unidades-federativas.component.scss'],
})
export class UnidadesFederativasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acoes'];
  unidadesFederativas = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ufService: UnidadesFederativasService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUnidadesFederativas();
  }

  ngAfterViewInit(): void {
    this.unidadesFederativas.paginator = this.paginator;
    this.unidadesFederativas.sort = this.sort;
  }

  loadUnidadesFederativas(
    params: {
      nome?: string;
    } = {}
  ) {
    params = params || {};

    this.ufService
      .getUnidadesFederativas(params)
      .pipe(
        catchError((error) => {
          const statusCode = error.status || 'Unknown status code';
          const errorMessage = `Error ${statusCode}: ${
            error.error.error ||
            'Error occurred while fetching Unidades Federativas'
          }`;
          if (statusCode === 401) {
            this.abrirModal(errorMessage, 'error');
            window.location.href = '/login';
          }
          return [];
        }),
        startWith([])
      )
      .subscribe((data) => {
        this.unidadesFederativas.data = data.ufs || [];
      });
  }

  abrirModal(message: string, type: string): void {
    const modalRef = this.modalService.open(MessageModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;
  }
}
