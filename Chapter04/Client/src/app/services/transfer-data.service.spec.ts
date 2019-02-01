import { TestBed } from '@angular/core/testing';

import { TransferDataService } from './transfer-data.service';

describe('TransferDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferDataService = TestBed.get(TransferDataService);
    expect(service).toBeTruthy();
  });
});
