import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component'; // Ajuste o caminho conforme necessário
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterModule } from '../footer/footer.module';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatListItem } from '@angular/material/list';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FooterModule,
        MatToolbar,
        MatIcon,
        MatListItem,
      ], // Importa o RouterTestingModule
      declarations: [
        HomePageComponent,
        HeaderComponent, // Inclui o HeaderComponent aqui
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
