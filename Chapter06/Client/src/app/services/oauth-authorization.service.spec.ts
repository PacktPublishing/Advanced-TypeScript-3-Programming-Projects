import { TestBed } from '@angular/core/testing';

import { OauthAuthorizationService } from './oauth-authorization.service';

describe('OauthAuthorizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OauthAuthorizationService = TestBed.get(OauthAuthorizationService);
    expect(service).toBeTruthy();
  });
});
