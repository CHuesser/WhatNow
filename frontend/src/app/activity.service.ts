import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity} from './types';
import {map, tap} from 'rxjs/operators';
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
            map(x => x.slice(startInt, endInt)),
            tap((y: Activity[]) => y.forEach(p => p.price = this.getPrice(p))
            ));
    }

    getPrice(activity: Activity): string {
        let price;
        const pattern1 = '(CHF )\\d+\\.*(\\.-)*\\d*';
        const pattern2 = '\\d+\\.*(\\.-)*\\d*( CHF)';
        const pattern3 = '(SFR )\\d+\\.*(\\.-)*\\d*';
        const pattern4 = '\\d+\\.*(\\.-)*\\d*( SFR)';
        const pattern5 = '\\d+(\\.\\d+)*(\\.-)*';

        if (activity.price_information)  {
            if (activity.price_information.includes('frei') ||
                activity.price_information.includes('gratis') ||
                activity.price_information.includes('libré') ||
                activity.price_information.includes('free')) {
                price = 'Free';
            } else if (activity.price_information.match(pattern1))  {
                price = 'ca. ' + activity.price_information.match(pattern1)[0].match('\\d+') + ' CHF';
            } else if (activity.price_information.match(pattern2))   {
                price = 'ca. ' + activity.price_information.match(pattern2)[0].match('\\d+') + ' CHF';
            } else if (activity.price_information.match(pattern3))  {
                price = 'ca. ' + activity.price_information.match(pattern3)[0].match('\\d+') + ' CHF';
            } else if (activity.price_information.match(pattern4))   {
                price = 'ca. ' + activity.price_information.match(pattern4)[0].match('\\d+') + ' CHF';
            } else if (activity.price_information.match(pattern5))  {
                price = 'ca. ' + activity.price_information.match(pattern5)[0].match('\\d+') + ' CHF';
            }
        } else {
            price =  'no information';
        }
        return price;
    }

// TODO
   /* sortActivityByPrice(startInt: number, endInt: number): Observable<Activity[]> {
    return this.getMultipleActivities(startInt, endInt).pipe(tap( values => values.sort(
        (a, b) => a.price_information - b.price_information)));

    }

    sortActivityByDuration(startInt: number, endInt: number): Observable<Activity[]> {
        return this.getMultipleActivities(startInt, endInt).pipe(tap( values => values.sort(
            (a, b) => a.duration - b.duration)));
    }*/
}
