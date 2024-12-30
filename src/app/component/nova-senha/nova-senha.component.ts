import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperacaoSenhaService } from 'src/app/shared/service/recuperar-senha.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenResponse } from 'src/app/interfaces/token-response.interface';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class NovaSenhaComponent implements OnInit {
  novaSenhaForm: FormGroup;
  tokenValido = false;
  usuario: TokenResponse;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recuperacaoSenhaService: RecuperacaoSenhaService
  ) {
    this.novaSenhaForm = this.fb.group(
      {
        novaSenha: ['', [Validators.required, Validators.minLength(6)]],
        confirmaSenha: ['', [Validators.required]],
      },
      { validator: this.senhasIguais }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.validarToken(token);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  validarToken(token: string): void {
    this.recuperacaoSenhaService.validarToken(token).subscribe(
      (tokenResponse) => {
        if (!tokenResponse) {
          this.router.navigate(['/login']);
        }
        this.usuario = tokenResponse;
        this.tokenValido = true;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao validar token:', error);
        this.tokenValido = false;
        this.router.navigate(['/login']); // Add this line
      }
    );
  }

  senhasIguais(group: FormGroup) {
    const novaSenha = group.get('novaSenha').value;
    const confirmaSenha = group.get('confirmaSenha').value;
    return novaSenha === confirmaSenha ? null : { senhasDiferentes: true };
  }

  onSubmit() {
    if (this.novaSenhaForm.valid && this.tokenValido) {
      // Lógica para salvar a nova senha
      console.log('Nova senha salva com sucesso');
      this.router.navigate(['/login']);
    }
  }
}
