import {TestBed} from '@angular/core/testing';

import {TraveldistanceService} from './traveldistance.service';

describe('TraveldistanceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TraveldistanceService = TestBed.get(TraveldistanceService);
        expect(service).toBeTruthy();
    });
});
