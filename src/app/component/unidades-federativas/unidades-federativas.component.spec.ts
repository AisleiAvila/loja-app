import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { UnidadesFederativasComponent } from './unidades-federativas.component';

describe('UnidadesFederativasComponent', () => {
  let component: UnidadesFederativasComponent;
  let fixture: ComponentFixture<UnidadesFederativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderComponent,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        FooterComponent,
        MatInputModule,
      ],
      declarations: [UnidadesFederativasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadesFederativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
