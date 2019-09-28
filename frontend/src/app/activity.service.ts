import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity} from './types';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    URL = './assets/data/event.json';

    constructor(public httpClient: HttpClient) {
    }

    getActivity(eventID: number): Observable<Activity> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
    }

    getMultipleActivities(startInt: number, endInt: number): Observable<Activity[]> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(
            map(x => x.slice(startInt, endInt)));
    }
}
