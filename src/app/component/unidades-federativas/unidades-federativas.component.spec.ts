import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnidadesFederativasComponent } from './unidades-federativas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderModule } from '../header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FooterModule } from '../footer/footer.module';
import { MatInputModule } from '@angular/material/input';

describe('UnidadesFederativasComponent', () => {
  let component: UnidadesFederativasComponent;
  let fixture: ComponentFixture<UnidadesFederativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        FooterModule,
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
