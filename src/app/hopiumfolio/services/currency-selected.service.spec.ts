import { TestBed } from '@angular/core/testing';

import { CurrencySelectedService } from './currency-selected.service';

describe('CurrencySelectedService', () => {
  let service: CurrencySelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencySelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
