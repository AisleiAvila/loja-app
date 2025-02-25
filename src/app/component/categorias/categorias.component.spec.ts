import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasComponent } from './categorias.component';
import { CategoriasService } from 'src/app/service/categorias.service';
import { of } from 'rxjs';

class MockCategoriasService {
  getCategorias() {
    return of([]);
  }

  deleteCategoria(id: number) {
    return of(null);
  }
}

describe('CategoriasComponent', () => {
  let component: CategoriasComponent;
  let fixture: ComponentFixture<CategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasComponent],
      providers: [{ provide: CategoriasService, useClass: MockCategoriasService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
