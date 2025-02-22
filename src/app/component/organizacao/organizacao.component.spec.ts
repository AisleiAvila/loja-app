import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizacaoComponent } from './organizacao.component';
import { OrganizacoesService } from 'src/app/service/organizacoes.service';
import { EstadoService } from 'src/app/service/estado.service';
import { ModalCommunicationService } from 'src/app/service/modal-communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('OrganizacaoComponent', () => {
  let component: OrganizacaoComponent;
  let fixture: ComponentFixture<OrganizacaoComponent>;
  let organizacoesService: jasmine.SpyObj<OrganizacoesService>;
  let estadoService: jasmine.SpyObj<EstadoService>;
  let modalCommunicationService: jasmine.SpyObj<ModalCommunicationService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  let translate: jasmine.SpyObj<TranslateService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    const organizacoesServiceSpy = jasmine.createSpyObj('OrganizacoesService', ['getOrganizacoes', 'deleteOrganizacao']);
    const estadoServiceSpy = jasmine.createSpyObj('EstadoService', ['getEstadosByPaisId']);
    const modalCommunicationServiceSpy = jasmine.createSpyObj('ModalCommunicationService', ['abrirModal']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const translateSpy = jasmine.createSpyObj('TranslateService', ['use']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      declarations: [OrganizacaoComponent],
      providers: [
        FormBuilder,
        { provide: OrganizacoesService, useValue: organizacoesServiceSpy },
        { provide: EstadoService, useValue: estadoServiceSpy },
        { provide: ModalCommunicationService, useValue: modalCommunicationServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useValue: translateSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizacaoComponent);
    component = fixture.componentInstance;
    organizacoesService = TestBed.inject(OrganizacoesService) as jasmine.SpyObj<OrganizacoesService>;
    estadoService = TestBed.inject(EstadoService) as jasmine.SpyObj<EstadoService>;
    modalCommunicationService = TestBed.inject(ModalCommunicationService) as jasmine.SpyObj<ModalCommunicationService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    translate = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load organizacoes on init', () => {
    spyOn(component, 'loadOrganizacoes');
    component.ngOnInit();
    expect(component.loadOrganizacoes).toHaveBeenCalled();
  });

  it('should call getEstados when a country is selected', () => {
    spyOn(component, 'getEstados');
    component.onPaisSelected(1);
    expect(component.getEstados).toHaveBeenCalledWith(1);
  });

  it('should handle error when loading estados', () => {
    const errorResponse = new Error('Erro ao carregar estados');
    estadoService.getEstadosByPaisId.and.returnValue(throwError(errorResponse));
    component.getEstados(1);
    expect(modalCommunicationService.abrirModal).toHaveBeenCalledWith('Erro ao carregar estados', 'Erro');
  });

  it('should load organizacoes with correct parameters', () => {
    const response = { organizacoes: [], totalRecords: 0 };
    organizacoesService.getOrganizacoes.and.returnValue(of(response));
    component.loadOrganizacoes();
    expect(organizacoesService.getOrganizacoes).toHaveBeenCalledWith({ limit: 5, offset: 0 });
  });

  it('should handle error when loading organizacoes', () => {
    const errorResponse = { status: 401, message: 'Unauthorized' };
    organizacoesService.getOrganizacoes.and.returnValue(throwError(errorResponse));
    component.loadOrganizacoes();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(snackBar.open).toHaveBeenCalledWith('Unauthorized', 'Fechar', { duration: 3000 });
  });

  it('should navigate to cadastro usuario', () => {
    component.navigateToCadastroUsuario();
    expect(router.navigate).toHaveBeenCalledWith(['/cadastro-organizacao'], { state: { acao: 'Cadastrar' } });
  });

  it('should open modal with correct message and type', () => {
    component.abrirModal('Test message', 'info');
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should delete organizacao and reload organizacoes', () => {
    organizacoesService.deleteOrganizacao.and.returnValue(of({}));
    spyOn(component, 'loadOrganizacoes');
    component.excluirUsuario(1);
    expect(snackBar.open).toHaveBeenCalledWith('Organização excluído com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
    expect(component.loadOrganizacoes).toHaveBeenCalled();
  });

  it('should handle error when deleting organizacao', () => {
    const errorResponse = new Error('Erro ao excluir organização');
    organizacoesService.deleteOrganizacao.and.returnValue(throwError(errorResponse));
    component.excluirUsuario(1);
    expect(modalCommunicationService.abrirModal).toHaveBeenCalledWith('Erro ao excluir organização' + errorResponse, 'error');
  });

  it('should change language', () => {
    component.changeLanguage('en');
    expect(translate.use).toHaveBeenCalledWith('en');
  });

  it('should clear filters and reload organizacoes', () => {
    spyOn(component, 'loadOrganizacoes');
    const nomeInput = document.createElement('input');
    const nifInput = document.createElement('input');
    const emailInput = document.createElement('input');
    component.limparFiltros(nomeInput, nifInput, emailInput);
    expect(component.pageIndex).toBe(0);
    expect(component.loadOrganizacoes).toHaveBeenCalled();
  });
});
