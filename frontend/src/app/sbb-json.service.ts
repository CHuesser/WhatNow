import {Injectable} from '@angular/core';
import {SbbDestination} from './types';
import {HttpClient} from '@angular/common/http';
import {HasLocation, TraveldistanceService} from './traveldistance.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SbbJsonService {
    items: SbbDestination[];
    private priceSorted: boolean;
    private timeSorted: boolean;
    private duration: number;
    private readonly TRAVEL_TIME_PLATFORM_MAX_DURATION_SECONDS = 14400;

    URL = './assets/data/towns.json';

    constructor(public httpClient: HttpClient, public traveldistanceService: TraveldistanceService) {
        this.duration = 30;

    }

    public getDestinationTime() {
        this.httpClient.get<SbbDestination[]>(this.URL).pipe(map(value => {

            const startingPoint: HasLocation = {
                address_latitude: 47.3788796,
                address_longitude: 8.538650199999999,
                event_id: 'startlocation'
            };

            console.log('loaded sbb thignies');

            this.traveldistanceService.filterReachableLocationsByTravelDistance(startingPoint, value, this.duration)
                .subscribe((found: SbbDestination[]) => {
                    console.log(found);
                    this.items = found;
                    console.log('YES');
                }, error => console.warn(error));
        })).subscribe();
    }

}
