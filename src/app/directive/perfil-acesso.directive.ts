import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appPerfilAcesso]',
  standalone: true,
})
export class PerfilAcessoDirective implements OnInit {
  @Input('appPerfilAcesso') perfisPermitidos: string[] = [];

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    const perfilUsuario = this.authService.getPerfilUsuario();
    if (!this.perfisPermitidos.includes(perfilUsuario)) {
      this.el.nativeElement.remove();
    }
  }
}
