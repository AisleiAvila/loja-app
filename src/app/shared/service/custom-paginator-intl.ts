import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  changes = new Subject<void>();

  constructor(private translate: TranslateService) {
    super();
    this.setTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.setTranslations();
    });
  }

  setTranslations() {
    this.updateLabel('LABLE_ITENS_POR_PAGINA', (translation: string) => {
      this.itemsPerPageLabel = translation;
    });

    this.updateLabel('LABLE_PROXIMA_PAGINA', (translation: string) => {
      this.nextPageLabel = translation;
    });

    this.updateLabel('LABLE_PAGINA_ANTERIOR', (translation: string) => {
      this.previousPageLabel = translation;
    });

    this.updateLabel('LABLE_PRIMEIRA_PAGINA', (translation: string) => {
      this.firstPageLabel = translation;
    });

    this.updateLabel('LABLE_ULTIMA_PAGINA', (translation: string) => {
      this.lastPageLabel = translation;
    });
  }

  updateLabel(key: string, callback: (translation: string) => void) {
    this.translate.get(key).subscribe((translation: string) => {
      callback(translation);
      this.changes.next(); // Notifica o MatPaginatorIntl sobre a mudança
    });
  }

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
      console.log('setValues', page, pageSize, length);
      // Verificar se os valores estão dentro dos limites
      start = Math.max(1, start);
      end = Math.min(end, total);

      // Formatar a string de acordo com as suas necessidades
      let rangeLabel = '';
      this.translate
        .get(['LABLE_EXIBINDO', 'LABLE_DE', 'LABLE_ITENS'])
        .subscribe((translations) => {
          rangeLabel = `${translations['LABLE_EXIBINDO']} ${start} - ${end} ${translations['LABLE_DE']} ${total} ${translations['LABLE_ITENS']}`;
        });

      return rangeLabel;
    };

    // Emitir mudanças apenas se os valores forem válidos
    if (total > 0) {
      this.changes.next();
    }
  }
}
