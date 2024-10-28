// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { UnidadesFederativasComponent } from './component/unidades-federativas/unidades-federativas.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { CadastroUsuarioComponent } from './component/usuarios/cadastro-usuario/cadastro-usuario.component';
import { LembrarSenhaComponent } from './component/lembrar-senha/lembrar-senha.component';
import { NovaSenhaComponent } from './component/nova-senha/nova-senha.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'unidades-federativas', component: UnidadesFederativasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-usuario/:id', component: CadastroUsuarioComponent },
  { path: 'lembrar-senha', component: LembrarSenhaComponent },
  { path: 'senha/validar-reset-token', component: NovaSenhaComponent },
  // Outras rotas

  // outras rotas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
