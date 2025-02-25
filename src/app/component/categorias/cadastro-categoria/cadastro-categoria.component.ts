import { CommonModule } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipInputEvent } from '@angular/material/chips';
import { Categoria } from 'src/app/model/categoria.model';
import { CategoriasService } from 'src/app/service/categorias.service';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    TranslateModule,
    MatOptionModule,
    NgFor
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CadastroCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', Validators.maxLength(255)],
      status: ['ATIVO', Validators.required],
      requer_certificacao: [false, Validators.required],
      tipo_certificacao: ['', Validators.maxLength(50)],
      experiencia_minima_meses: [0, [Validators.min(0)]],
      nivel_risco: ['BAIXO', Validators.required],
      seguro_obrigatorio: [false, Validators.required],
      valor_base_hora: [0, [Validators.min(0)]],
      horas_minimas_agendamento: [24, [Validators.required, Validators.min(1)]],
      horas_cancelamento_gratis: [24, [Validators.required, Validators.min(0)]],
      percentual_comissao: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      url_imagem: ['', Validators.maxLength(255)],
      palavras_chave: [[]],
      documentos_necessarios: [[]],
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const categoria: Categoria = this.categoriaForm.value;
      this.categoriasService.createCategoria(categoria).subscribe(
        () => {
          this.snackBar.open('Categoria criada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.router.navigate(['/categorias']);
        },
        (error) => {
          console.error('Erro ao criar categoria:', error);
          this.snackBar.open('Erro ao criar categoria', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categoriaForm.get('palavras_chave').value.push(value.trim());
      this.categoriaForm.get('palavras_chave').updateValueAndValidity();
    }

    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: string): void {
    const index = this.categoriaForm.get('palavras_chave').value.indexOf(keyword);

    if (index >= 0) {
      this.categoriaForm.get('palavras_chave').value.splice(index, 1);
      this.categoriaForm.get('palavras_chave').updateValueAndValidity();
    }
  }

  addDocument(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.categoriaForm.get('documentos_necessarios').value.push(value.trim());
      this.categoriaForm.get('documentos_necessarios').updateValueAndValidity();
    }

    if (input) {
      input.value = '';
    }
  }

  removeDocument(doc: string): void {
    const index = this.categoriaForm.get('documentos_necessarios').value.indexOf(doc);

    if (index >= 0) {
      this.categoriaForm.get('documentos_necessarios').value.splice(index, 1);
      this.categoriaForm.get('documentos_necessarios').updateValueAndValidity();
    }
  }

  cancelar(): void {
    this.router.navigate(['/categorias']);
  }
}
