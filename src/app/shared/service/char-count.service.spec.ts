import { TestBed } from '@angular/core/testing';

import { CharCountService } from './char-count.service';

describe('CharCountService', () => {
  let service: CharCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
