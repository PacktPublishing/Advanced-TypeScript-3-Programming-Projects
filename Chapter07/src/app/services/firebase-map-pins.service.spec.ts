import { TestBed } from '@angular/core/testing';

import { FirebaseMapPinsService } from './firebase-map-pins.service';

describe('FirebaseMapPinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseMapPinsService = TestBed.get(FirebaseMapPinsService);
    expect(service).toBeTruthy();
  });
});
