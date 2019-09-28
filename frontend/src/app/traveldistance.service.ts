import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Location, TimeFilterAPIRequest, TimeFilterAPIResponse} from './time-filter-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface HasLocation {
    event_id: string | number;
    address_latitude: number;
    address_longitude: number;
}


@Injectable({
    providedIn: 'root'
})
export class TraveldistanceService {

    private traveltimeplatformClient = '';
    private traveltimeplatformSecret = '';

    constructor(public httpClient: HttpClient) {
        this.httpClient.get('./assets/secrets.json').subscribe((secrets: any) => {
            this.traveltimeplatformClient = secrets.traveltimeplatform.client;
            this.traveltimeplatformSecret = secrets.traveltimeplatform.secret;
            console.log('using credentials of the following traveltimeplatform client', this.traveltimeplatformClient);
        }, error => {
            console.warn('failed to load credentials for traveltimeplatform');
        });
    }

    public filterReachableLocationsByTravelDistance<T extends HasLocation>(startingPoint: HasLocation, candidates: T[], travelTimeSeconds: number = 3600): Observable<T[]> {

        // api limit is 2000 locations FIXME sort by location first so we discard likely uninteresting events
        candidates = candidates.slice(0, 1999);

        const HERE_LOCATION_ID = String(startingPoint.event_id);
        const HERE_LOCATION: Location = {
            id: HERE_LOCATION_ID,
            coords: {
                lat: startingPoint.address_latitude,
                lng: startingPoint.address_longitude
            }
        };
        const locations: Location[] = candidates.map(value => {
            return {
                id: String(value.event_id),
                coords: {
                    lat: value.address_latitude,
                    lng: value.address_longitude
                }
            };
        });

        const request: TimeFilterAPIRequest = {
                locations: locations.concat(HERE_LOCATION),
                departure_searches: [
                    {
                        id: 'first awesome search',
                        arrival_location_ids: locations.map(l => l.id),
                        departure_location_id: HERE_LOCATION.id,
                        departure_time: new Date(),
                        travel_time: travelTimeSeconds,
                        properties: [
                            'travel_time'
                        ],
                        transportation:
                            {
                                type: 'public_transport'
                            }
                    }
                ]
            }
        ;


        return this.httpClient.post<TimeFilterAPIResponse>('https://api.traveltimeapp.com/v4/time-filter',
            request,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Application-Id': this.traveltimeplatformClient,
                    'X-Api-Key': this.traveltimeplatformSecret
                })
            }
        ).pipe(
            map(response => response.results[0].locations),
            map(reachable => candidates.filter(c => reachable.some(r => r.id === String(c.event_id)))));
    }

}
