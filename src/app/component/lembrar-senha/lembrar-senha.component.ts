import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LembrarSenhaService } from 'src/app/shared/service/lembrar-senha.service';

@Component({
  selector: 'app-lembrar-senha',
  templateUrl: './lembrar-senha.component.html',
  styleUrls: ['./lembrar-senha.component.scss'],
})
export class LembrarSenhaComponent {
  lembrarSenhaForm: FormGroup;
  mensagem: string;

  constructor(
    private fb: FormBuilder,
    private lembrarSenhaService: LembrarSenhaService
  ) {
    this.lembrarSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.lembrarSenhaForm.valid) {
      const email = this.lembrarSenhaForm.get('email').value;
      this.lembrarSenhaService.lembrarSenha(email).subscribe(
        (response) => {
          this.mensagem =
            'Um link de redefinição de senha foi enviado para o seu e-mail.';
        },
        (error) => {
          console.error(
            'Erro ao enviar e-mail de redefinição de senha:',
            error
          );
          this.mensagem =
            'Ocorreu um erro ao enviar o e-mail de redefinição de senha. Detalhes: ' +
            this.formatarErro(error);
          this.mensagem =
            'Ocorreu um erro ao enviar o e-mail de redefinição de senha.';
        }
      );
    }
  }

  private formatarErro(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'Ocorreu um erro desconhecido';
    }
  }
}
