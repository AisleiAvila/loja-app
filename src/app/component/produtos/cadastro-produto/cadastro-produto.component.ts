import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from 'src/app/model/produto.model';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
})
export class CadastroProdutoComponent implements OnInit {
  isEditMode = true;
  isCreateMode = true;
  titulo = '';
  acao = 'Cadastrar';

  id = 0;
  nome = '';
  descricao = '';
  preco = 0;
  quantidade = 0;
  categoria = '';
  organizacaoId = 1; // Valor fixo para exemplo
  status: 'ATIVO' | 'INATIVO' = 'ATIVO';
  codigoBarras = '';
  unidadeMedida = '';
  peso = 0;
  dimensoes = {
    altura: 0,
    largura: 0,
    profundidade: 0,
  };

  // Mensagens de erro
  nomeErro = '';
  descricaoErro = '';
  precoErro = '';
  quantidadeErro = '';
  categoriaErro = '';
  unidadeMedidaErro = '';

  // Lista de unidades de medida
  unidadesMedida: string[] = ['UN', 'KG', 'L', 'M', 'M2', 'M3'];

  // Lista de categorias
  categorias: string[] = [
    'Eletrônicos',
    'Móveis',
    'Roupas',
    'Alimentos',
    'Bebidas',
    'Outros',
  ];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    const id = this.route.snapshot.params['id'];
    const state = history.state;

    this.acao = state?.acao || 'Cadastrar';
    this.isCreateMode = !id;
    this.definirTitulo();

    if (id) {
      this.carregarProduto(id);
    }
  }

  private definirTitulo(): void {
    let titleKey = '';
    if (this.acao === 'Alterar') {
      titleKey = 'TITLE_ALTERAR_PRODUTO';
    } else if (this.acao === 'Cadastrar') {
      titleKey = 'TITLE_CADASTRAR_PRODUTO';
    } else {
      titleKey = 'TITLE_DETALHAR_PRODUTO';
      this.isEditMode = false;
    }

    this.translate.get(titleKey).subscribe((traducao: string) => {
      this.titulo = traducao;
    });
  }

  private carregarProduto(id: number): void {
    this.produtoService.getProdutoById(id).subscribe({
      next: (response) => {
        if (response?.produtos?.[0]) {
          this.preencherFormulario(response.produtos[0]);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar produto:', error);
        this.snackBar.open('Erro ao carregar produto', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  private preencherFormulario(produto: Produto): void {
    this.id = produto.id;
    this.nome = produto.nome;
    this.descricao = produto.descricao;
    this.preco = produto.preco;
    this.quantidade = produto.quantidade;
    this.categoria = produto.categoria;
    this.status = produto.status;
    this.codigoBarras = produto.codigoBarras;
    this.unidadeMedida = produto.unidadeMedida;
    this.peso = produto.peso;
    this.dimensoes = produto.dimensoes || {
      altura: 0,
      largura: 0,
      profundidade: 0,
    };
  }

  validarCampos(): boolean {
    this.resetarErros();
    let isValid = true;

    if (!this.nome?.trim()) {
      this.nomeErro = this.translate.instant('LABLE_NOME_OBRIGATORIO');
      isValid = false;
    }

    if (!this.descricao?.trim()) {
      this.descricaoErro = this.translate.instant(
        'LABLE_DESCRICAO_OBRIGATORIA'
      );
      isValid = false;
    }

    if (!this.preco || this.preco <= 0) {
      this.precoErro = this.translate.instant('LABLE_PRECO_OBRIGATORIO');
      isValid = false;
    }

    if (!this.quantidade || this.quantidade < 0) {
      this.quantidadeErro = this.translate.instant(
        'LABLE_QUANTIDADE_OBRIGATORIA'
      );
      isValid = false;
    }

    if (!this.categoria?.trim()) {
      this.categoriaErro = this.translate.instant(
        'LABLE_CATEGORIA_OBRIGATORIA'
      );
      isValid = false;
    }

    if (!this.unidadeMedida?.trim()) {
      this.unidadeMedidaErro = this.translate.instant(
        'LABLE_UNIDADE_MEDIDA_OBRIGATORIA'
      );
      isValid = false;
    }

    if (!isValid) {
      this.snackBar.open(
        this.translate.instant('LABLE_CAMPOS_OBRIGATORIOS'),
        this.translate.instant('LABLE_FECHAR'),
        { duration: 3000 }
      );
    }

    return isValid;
  }

  private resetarErros(): void {
    this.nomeErro = '';
    this.descricaoErro = '';
    this.precoErro = '';
    this.quantidadeErro = '';
    this.categoriaErro = '';
    this.unidadeMedidaErro = '';
  }

  salvar(): void {
    if (this.validarCampos()) {
      const produto = {
        id: this.id,
        nome: this.nome,
        descricao: this.descricao,
        preco: this.preco,
        quantidade: this.quantidade,
        categoria: this.categoria,
        organizacaoId: this.organizacaoId,
        status: this.status,
        codigoBarras: this.codigoBarras,
        unidadeMedida: this.unidadeMedida,
        peso: this.peso,
        dimensoes: this.dimensoes,
      };

      const operacao = this.id
        ? this.produtoService.updateProduto(produto)
        : this.produtoService.saveProduto(produto);

      operacao.subscribe({
        next: () => {
          this.snackBar.open(
            this.id
              ? 'Produto atualizado com sucesso!'
              : 'Produto cadastrado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.voltar();
        },
        error: (error) => {
          console.error('Erro ao salvar produto:', error);
          this.snackBar.open('Erro ao salvar produto', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/produtos']);
  }
}
