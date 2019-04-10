import { TestBed } from '@angular/core/testing';

import { ChatMessagesService } from './chat-messages.service';

describe('ChatMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMessagesService = TestBed.get(ChatMessagesService);
    expect(service).toBeTruthy();
  });
});
