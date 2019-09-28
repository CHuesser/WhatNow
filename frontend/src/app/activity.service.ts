import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity, Category, EventCategory} from './types';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EventCategoryService} from './event-category.service';
import {CategoryService} from './category.service';
import {flatMap} from 'tslint/lib/utils';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    URL = './assets/data/event.json';

    constructor(public httpClient: HttpClient, public eventCategoryService: EventCategoryService, public categoryService: CategoryService) {
    }

    getActivity(eventID: number): Observable<Activity> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
    }

    getMultipleActivities(startInt: number, endInt: number): Observable<Activity[]> {
        return this.httpClient.get<Activity[]>(this.URL).pipe(
            map(x => x.slice(startInt, endInt)),
            tap((y: Activity[]) => y.forEach(p => p.price = this.getPrice(p))),
            tap((y: Activity[]) => y.forEach(c => this.getCategory(c.event_id).subscribe(bn => c.category = bn.title_en)))
        );
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
                price = activity.price_information.match(pattern1)[0].match('\\d+');
            } else if (activity.price_information.match(pattern2))   {
                price = activity.price_information.match(pattern2)[0].match('\\d+');
            } else if (activity.price_information.match(pattern3))  {
                price = activity.price_information.match(pattern3)[0].match('\\d+');
            } else if (activity.price_information.match(pattern4))   {
                price = activity.price_information.match(pattern4)[0].match('\\d+');
            } else if (activity.price_information.match(pattern5))  {
                price = activity.price_information.match(pattern5)[0].match('\\d+');
            }
        } else {
            price =  null;
        }
        return price;
    }

    getCategory(eventID: number): Observable<Category> {
        return this.eventCategoryService.getEventCategory(eventID).pipe(map (c => c ? c.category_id : 1147),
            switchMap((n: number) => this.categoryService.getCategory(n)));
    }
}
