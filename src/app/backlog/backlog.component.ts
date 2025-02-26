import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { Task } from '../model/task.model';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
  ],
})
export class BackLogComponent {
  tasks: Task[] = [
    { id: 1, description: 'Implementar "Esqueceu a senha?', completed: false },
    { id: 2, description: 'Utilizar Refresh Token', completed: false },
    { id: 3, description: 'Refatorar para utilizar OpenApi', completed: true },
    { id: 4, description: 'Criar Crud de Perfil', completed: false },
    {
      id: 5,
      description: 'Utilizar skleton ao carregar páginas',
      completed: false,
    },
    {
      id: 6,
      description:
        'Criar trilha de auditoria utilizando tigger no banco de dados',
      completed: false,
    },
    {
      id: 7,
      description:
        'Criar serviço salve os acessos ao sistema "Simular Google Analytics"',
      completed: false,
    },
    {
      id: 8,
      description: 'Migrar aplicação para Angular 19',
      completed: true,
    },
    {
      id: 9,
      description: 'Realizar pesquisa por nome desconsiderando acentuação',
      completed: false,
    },
  ];
  displayedColumns: string[] = ['description', 'completed'];
  selection = new SelectionModel<Task>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tasks.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.tasks.forEach((row) => this.selection.select(row));
    }
  }
}
