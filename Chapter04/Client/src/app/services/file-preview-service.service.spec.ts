import { TestBed } from '@angular/core/testing';

import { FilePreviewService } from './file-preview-service.service';

describe('FilePreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilePreviewService = TestBed.get(FilePreviewService);
    expect(service).toBeTruthy();
  });
});
