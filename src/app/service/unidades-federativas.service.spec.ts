import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UnidadesFederativasService } from './unidades-federativas.service';

describe('UnidadesFederativasService', () => {
  let service: UnidadesFederativasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnidadesFederativasService],
    });
    service = TestBed.inject(UnidadesFederativasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
