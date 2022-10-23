import { TestBed } from '@angular/core/testing';

import { NewRowService } from './new-row.service';

describe('NewRowService', () => {
  let service: NewRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
