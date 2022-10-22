import { TestBed } from '@angular/core/testing';

import { ApiCoingeckoService } from './api-coingecko.service';

describe('ApiCoingeckoService', () => {
  let service: ApiCoingeckoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCoingeckoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
