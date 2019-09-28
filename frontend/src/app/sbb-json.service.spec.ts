import { TestBed } from '@angular/core/testing';

import { SbbJsonService } from './sbb-json.service';

describe('SbbJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SbbJsonService = TestBed.get(SbbJsonService);
    expect(service).toBeTruthy();
  });
});
