import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity, Category, EventCategory} from './types';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventCategoryService} from './event-category.service';
import {CategoryService} from './category.service';
import {flatMap} from 'tslint/lib/utils';
import {Location, TimeFilterAPIRequest, TimeFilterAPIResponse} from './time-filter-api';
import {Datetime} from '@ionic/core/dist/types/components/datetime/datetime';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    URL = './assets/data/event.json';

    private traveltimeplatformClient = '';
    private traveltimeplatformSecret = '';

    constructor(public httpClient: HttpClient, public eventCategoryService: EventCategoryService, public categoryService: CategoryService) {
        this.httpClient.get('./assets/secrets.json').subscribe((secrets: any) => {
            this.traveltimeplatformClient = secrets.traveltimeplatform.client;
            this.traveltimeplatformSecret = secrets.traveltimeplatform.secret;
            console.log('using credentials of the following traveltimeplatform client', this.traveltimeplatformClient);
        }, error => {
            console.warn('failed to load credentials for traveltimeplatform');
        });
    }

    getActivity(eventID: number): Observable<Activity> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
    }

    getMultipleActivities(startInt: number, endInt: number): Observable<Activity[]> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(
            map(x => x.slice(startInt, endInt)),
            tap((y: Activity[]) => y.forEach(p => p.price = this.getPrice(p))),
            tap((y: Activity[]) => y.forEach(c => this.getCategory(c.event_id).subscribe(bn => c.category = bn.title_en))),
            tap((y: Activity[]) => y.forEach(d => d.duration = this.getDuration(d)))
        );
    }

    getPrice(activity: Activity): string {
        let price;
        const pattern1 = '(CHF )\\d+\\.*(\\.-)*\\d*';
        const pattern2 = '\\d+\\.*(\\.-)*\\d*( CHF)';
        const pattern3 = '(SFR )\\d+\\.*(\\.-)*\\d*';
        const pattern4 = '\\d+\\.*(\\.-)*\\d*( SFR)';
        const pattern5 = '\\d+(\\.\\d+)*(\\.-)*';

        if (activity.price_information) {
            if (activity.price_information.includes('frei') ||
                activity.price_information.includes('gratis') ||
                activity.price_information.includes('libré') ||
                activity.price_information.includes('free')) {
                price = 'Free';
            } else if (activity.price_information.match(pattern1)) {
                price = activity.price_information.match(pattern1)[0].match('\\d+');
            } else if (activity.price_information.match(pattern2)) {
                price = activity.price_information.match(pattern2)[0].match('\\d+');
            } else if (activity.price_information.match(pattern3)) {
                price = activity.price_information.match(pattern3)[0].match('\\d+');
            } else if (activity.price_information.match(pattern4)) {
                price = activity.price_information.match(pattern4)[0].match('\\d+');
            } else if (activity.price_information.match(pattern5)) {
                price = activity.price_information.match(pattern5)[0].match('\\d+');
            }
        } else {
            price = null;
        }
        return price;
    }

    getDuration(activity: Activity): number {
    let duration;
    if (activity.start_time  && activity.end_time &&
         activity.start_time.match('\\d{2}:\\d{2}:\\d{2}\\.\\d') &&
            activity.end_time.match('\\d{2}:\\d{2}:\\d{2}\\.\\d')) {
        duration = Date.parse('27 Jan 2019 ' + activity.end_time) - Date.parse( '27 Jan 2019 ' + activity.start_time);
        if (duration < 0)    {
            duration = 24 * 60 + duration / 60000;
        } else {
            duration = duration / 60000;
        }
        console.log(duration);
    } else {
        duration = null;
    }
    return duration;
    }

    getCategory(eventID: number): Observable<Category> {
        return this.eventCategoryService.getEventCategory(eventID).pipe(map(c => c ? c.category_id : 1147),
            switchMap((n: number) => this.categoryService.getCategory(n)));
    }

    public findActivities(latitude: number, longitude: number, candidates: Activity[], travelTimeSeconds: number = 3600): Observable<Activity[]> {

        // api limit is 2000 locations FIXME sort by location first so we discard likely uninteresting events
        candidates = candidates.slice(0, 1999);

        const HERE_LOCATION_ID = 'here';
        const HERE_LOCATION: Location = {
            id: HERE_LOCATION_ID,
            coords: {
                lat: latitude,
                lng: longitude
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
