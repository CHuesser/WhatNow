import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventCategory} from './types';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventCategoryService {
    URL = './assets/data/event_category.json';

    constructor(public httpClient: HttpClient) {
    }

    getEventCategory(eventID: number): Observable<EventCategory> {
        return this.httpClient.get<EventCategory[]>(this.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
    }
}
