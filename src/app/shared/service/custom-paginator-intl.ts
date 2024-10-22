import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  changes = new Subject<void>();

  itemsPerPageLabel = 'Itens por página:';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';

  /**
   * Método para emitir mudanças
   *
   * Este método emite um evento de mudança através do Subject `changes`.
   * Pode ser utilizado para notificar outros componentes ou serviços
   * sobre mudanças no estado do paginador.
   */
  emitChanges() {
    this.changes.next();
  }

  /**
   * Método para definir os valores do paginador
   *
   * Este método define os valores de início, fim e total de registros
   * exibidos no paginador. Estes valores são utilizados para exibir
   * a informação de quantidade de registros exibidos no paginador.
   *
   * @param start Número do primeiro registro exibido
   * @param end Número do último registro exibido
   * @param total Número total de registros
   */
  setValues(start: number, end: number, total: number) {
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      // Verificar se os valores estão dentro dos limites
      start = Math.max(1, start);
      end = Math.min(end, total);

      // Formatar a string de acordo com as suas necessidades
      return `Exibindo ${start} - ${end} de ${total} registros`;
    };

    // Emitir mudanças apenas se os valores forem válidos
    if (total > 0) {
      this.changes.next();
    }
  }
}
