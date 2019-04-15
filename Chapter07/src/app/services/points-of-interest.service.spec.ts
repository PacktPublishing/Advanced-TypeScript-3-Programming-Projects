import { TestBed } from '@angular/core/testing';

import { PointsOfInterestService } from './points-of-interest.service';

describe('PointsOfInterestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointsOfInterestService = TestBed.get(PointsOfInterestService);
    expect(service).toBeTruthy();
  });
});
