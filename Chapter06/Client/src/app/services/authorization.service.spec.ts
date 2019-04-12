import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationService = TestBed.get(AuthorizationService);
    expect(service).toBeTruthy();
  });
});
