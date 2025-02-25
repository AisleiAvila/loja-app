import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AgendamentoService } from '../../service/agendamento.service';
import { Agendamento } from '../../model/agendamento.model';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class AgendamentosComponent implements OnInit {
  displayedColumns: string[] = [
    'cliente',
    'prestador',
    'servico',
    'data_inicio',
    'hora_inicio',
    'status',
    'valor_total',
    'acoes',
  ];

  dataSource = new MatTableDataSource<Agendamento>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAgendamentos();
  }

  loadAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe((response) => {
      this.dataSource.data = response.agendamentos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  novoAgendamento() {
    this.router.navigate(['/agendamentos/novo']);
  }

  editarAgendamento(id: number) {
    this.router.navigate([`/agendamentos/editar/${id}`]);
  }

  excluirAgendamento(id: number) {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      this.agendamentoService.deleteAgendamento(id).subscribe(() => {
        this.loadAgendamentos();
      });
    }
  }
}
