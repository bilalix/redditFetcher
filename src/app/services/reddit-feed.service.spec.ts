import { TestBed } from '@angular/core/testing';

import { RedditFeedService } from './reddit-feed.service';

describe('RedditFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedditFeedService = TestBed.get(RedditFeedService);
    expect(service).toBeTruthy();
  });
});
