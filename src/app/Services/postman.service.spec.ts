import { TestBed } from '@angular/core/testing';

import { PostmanService } from './postman.service';

describe('PostmanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostmanService = TestBed.get(PostmanService);
    expect(service).toBeTruthy();
  });
});
