import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderModule } from '../header/header.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterModule } from '../footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let modalService: any;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalCommunicationService', [
      'abrirModal',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderModule,
        MatCheckboxModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FooterModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: ModalCommunicationService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalCommunicationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error modal when email is not provided', () => {
    component.email = '';
    component.recuperarSenha();
    expect(modalService.abrirModal).toHaveBeenCalledWith(
      'Email é obrigatório',
      'Erro de Recuperação de Senha'
    );
  });

  it('should show not implemented modal when email is provided', () => {
    component.email = 'test@example.com';
    component.recuperarSenha();
    expect(modalService.abrirModal).toHaveBeenCalledWith(
      'Falta implementar método para Esqueceu a senha...',
      'Recuperação de Senha'
    );
  });
});
