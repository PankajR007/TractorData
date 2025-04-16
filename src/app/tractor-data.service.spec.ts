import { TestBed } from '@angular/core/testing';

import { TractorDataService } from './tractor-data.service';

describe('TractorDataService', () => {
  let service: TractorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TractorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
