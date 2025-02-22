import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosComponent } from './produtos.component';
import { ProdutoService } from 'src/app/service/produto.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProdutosComponent', () => {
  let component: ProdutosComponent;
  let fixture: ComponentFixture<ProdutosComponent>;
  let produtoService: jasmine.SpyObj<ProdutoService>;

  beforeEach(async () => {
    const produtoServiceSpy = jasmine.createSpyObj('ProdutoService', [
      'getProdutos',
      'deleteProduto',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ProdutosComponent],
      imports: [
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [{ provide: ProdutoService, useValue: produtoServiceSpy }],
    }).compileComponents();

    produtoService = TestBed.inject(
      ProdutoService
    ) as jasmine.SpyObj<ProdutoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockResponse = {
      produtos: [
        {
          id: 1,
          nome: 'Produto 1',
          categoria: 'Categoria 1',
          preco: 100,
          quantidade: 10,
          status: 'ATIVO',
        },
      ],
      totalRecords: 1,
    };
    produtoService.getProdutos.and.returnValue(of(mockResponse));

    component.ngOnInit();
    component.ngAfterViewInit();

    expect(produtoService.getProdutos).toHaveBeenCalled();
    expect(component.produtos.data.length).toBe(1);
    expect(component.totalProdutos).toBe(1);
  });

  it('should delete a product', () => {
    produtoService.deleteProduto.and.returnValue(of({}));

    spyOn(window, 'confirm').and.returnValue(true);
    component.excluirProduto(1);

    expect(produtoService.deleteProduto).toHaveBeenCalledWith(1);
  });

  it('should clear filters', () => {
    const nomeInput = document.createElement('input');
    const categoriaInput = document.createElement('input');
    nomeInput.value = 'Test';
    categoriaInput.value = 'Test';

    component.limparFiltros(nomeInput, categoriaInput);

    expect(nomeInput.value).toBe('');
    expect(categoriaInput.value).toBe('');
  });
});
