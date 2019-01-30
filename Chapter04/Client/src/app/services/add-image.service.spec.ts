import { TestBed } from '@angular/core/testing';

import { AddImageService } from './add-image.service';

describe('AddImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddImageService = TestBed.get(AddImageService);
    expect(service).toBeTruthy();
  });
});
