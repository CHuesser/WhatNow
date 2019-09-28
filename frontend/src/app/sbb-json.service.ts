import {Injectable} from '@angular/core';
import {SbbDestination} from './types';
import {HttpClient} from '@angular/common/http';
import {HasLocation, TraveldistanceService} from './traveldistance.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SbbJsonService {

    readonly URL = './assets/data/towns.json';

    constructor(public httpClient: HttpClient, public traveldistanceService: TraveldistanceService) {
    }

    public getSbbDestinationsReachableFrom(latitude: number, longitude: number, travelTimeSeconds): Observable<SbbDestination[]> {
        return this.httpClient.get<SbbDestination[]>(this.URL).pipe(switchMap(value => {
            const startingPoint: HasLocation = {
                address_latitude: latitude,
                address_longitude: longitude,
                event_id: 'startlocation'
            };

            return this.traveldistanceService.filterReachableLocationsByTravelDistance(startingPoint, value, travelTimeSeconds);
        }));
    }

}
