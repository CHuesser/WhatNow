import { TestBed } from '@angular/core/testing';

import { SbbdestinationService } from './sbbdestination.service';

describe('SbbdestinationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SbbdestinationService = TestBed.get(SbbdestinationService);
    expect(service).toBeTruthy();
  });
});
