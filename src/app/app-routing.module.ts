// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { CadastroUsuarioComponent } from './component/usuarios/cadastro-usuario/cadastro-usuario.component';
import { LembrarSenhaComponent } from './component/lembrar-senha/lembrar-senha.component';
import { NovaSenhaComponent } from './component/nova-senha/nova-senha.component';
import { ChatComponent } from './component/chat/chat.component';
import { TermsComponent } from './component/terms/terms.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { OrganizacaoComponent } from './component/organizacao/organizacao.component';
import { CadastroOrganizacaoComponent } from './component/organizacao/cadastro-organizacao/cadastro-organizacao.component';
import { ProdutosComponent } from './component/produtos/produtos.component';
import { CadastroProdutoComponent } from './component/produtos/cadastro-produto/cadastro-produto.component';
import { BackLogComponent } from './backlog/backlog.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { CadastroCategoriaComponent } from './component/categorias/cadastro-categoria/cadastro-categoria.component';
import { AgendamentosComponent } from './component/agendamentos/agendamentos.component';
import { CadastroAgendamentoComponent } from './component/agendamentos/cadastro-agendamento/cadastro-agendamento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-usuario/:id', component: CadastroUsuarioComponent },
  { path: 'lembrar-senha', component: LembrarSenhaComponent },
  { path: 'senha/validar-reset-token', component: NovaSenhaComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'organizacao', component: OrganizacaoComponent },
  { path: 'cadastro-organizacao/:id', component: CadastroOrganizacaoComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadastroProdutoComponent },
  { path: 'backlog', component: BackLogComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias/add', component: CadastroCategoriaComponent },
  { path: 'categorias/edit/:id', component: CadastroCategoriaComponent },
  { path: 'cadastro-categoria', component: CadastroCategoriaComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
  { path: 'agendamentos/novo', component: CadastroAgendamentoComponent },
  { path: 'agendamentos/editar/:id', component: CadastroAgendamentoComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
