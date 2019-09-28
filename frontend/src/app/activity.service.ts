import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity, Category} from './types';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EventCategoryService} from './event-category.service';
import {CategoryService} from './category.service';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private static allById: {};
    private static all: Activity[];

    private static readonly URL = './assets/data/event.json';

    public static initialize(httpClient: HttpClient) {
        if (!ActivityService.all) {
            httpClient.get<Activity[]>(ActivityService.URL).subscribe(activities => {
                ActivityService.all = activities;
                ActivityService.allById = activities.reduce((hashmap, currentValue) => {
                    hashmap[currentValue.event_id] = currentValue;
                    return hashmap;
                }, {});
            });
        }
    }

    constructor(public httpClient: HttpClient, public eventCategoryService: EventCategoryService, public categoryService: CategoryService) {
        ActivityService.initialize(this.httpClient);
    }

    getActivity(eventID: number): Observable<Activity> {
        let observable: Observable<Activity>;

        if (ActivityService.all) {
            observable = of(ActivityService.allById[eventID]);
        } else {
            observable = this.httpClient.get<Activity[]>(ActivityService.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
        }

        return observable.pipe(
            tap((y: Activity) => y.price = this.getPrice(y)),
            tap((c: Activity) => this.getCategory(c.event_id).subscribe(bn => c.category = bn.title_en)),
            tap((d: Activity) => d.duration = this.getDuration(d)));
    }

    getMultipleActivities(startInt: number, endInt: number): Observable<Activity[]> {
        let observable: Observable<Activity[]>;

        if (ActivityService.all) {
            observable = of(ActivityService.all.slice(startInt, endInt));
        } else {
            observable = this.httpClient.get<Activity[]>(ActivityService.URL).pipe(map(x => x.slice(startInt, endInt)));
        }

        return observable.pipe(
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
        if (activity.start_time && activity.end_time &&
            activity.start_time.match('\\d{2}:\\d{2}:\\d{2}\\.\\d') &&
            activity.end_time.match('\\d{2}:\\d{2}:\\d{2}\\.\\d')) {
            duration = Date.parse('27 Jan 2019 ' + activity.end_time) - Date.parse('27 Jan 2019 ' + activity.start_time);
            if (duration < 0) {
                duration = 24 * 60 + duration / 60000;
            } else {
                duration = duration / 60000;
            }
        } else {
            duration = null;
        }
        return duration;
    }

    getCategory(eventID: number): Observable<Category> {
        return this.eventCategoryService.getEventCategory(eventID).pipe(map(c => c ? c.category_id : 1147),
            switchMap((n: number) => this.categoryService.getCategory(n)));
    }
}

