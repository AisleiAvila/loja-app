import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOrganizacaoComponent } from './cadastro-organizacao.component';

describe('CadastroOrganizacaoComponent', () => {
  let component: CadastroOrganizacaoComponent;
  let fixture: ComponentFixture<CadastroOrganizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroOrganizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroOrganizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
