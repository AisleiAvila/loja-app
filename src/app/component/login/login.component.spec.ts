import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let modalService: jasmine.SpyObj<ModalCommunicationService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalCommunicationService', [
      'abrirModal',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderComponent,
        MatCheckboxModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        FooterComponent,
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
    modalService = TestBed.inject(
      ModalCommunicationService
    ) as jasmine.SpyObj<ModalCommunicationService>; // Tipagem correta
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
