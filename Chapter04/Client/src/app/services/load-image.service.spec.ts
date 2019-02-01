import { TestBed } from '@angular/core/testing';

import { LoadImageService } from './load-image.service';

describe('LoadImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadImageService = TestBed.get(LoadImageService);
    expect(service).toBeTruthy();
  });
});
