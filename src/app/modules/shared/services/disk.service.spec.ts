import { TestBed } from '@angular/core/testing';

import { DiskService } from './disk.service';

describe('DiskServiceService', () => {
  let service: DiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
