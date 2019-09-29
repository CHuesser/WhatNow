import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Activity, Category, EventCategory} from './types';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private static allById: {};
    private static all: Activity[];

    private static readonly URL = './assets/data/event.json';

    public static initialize(httpClient: HttpClient) {
        if (!ActivityService.all) {

            httpClient.get<EventCategory[]>('./assets/data/event_category.json').subscribe(eventCategories => {
                httpClient.get<Category[]>('./assets/data/category.json').subscribe(categories => {
                    httpClient.get<Activity[]>('./assets/data/event.json').subscribe(activities => {
                        activities = activities.filter(activity => this.isInTheFuture(activity))
                            .filter(activity => activity.address_latitude &&
                                activity.address_longitude &&
                                (typeof activity.address_longitude === 'number') &&
                                (typeof activity.address_latitude === 'number'));

                        activities.forEach(activity => {
                            activity.price = ActivityService.getPrice(activity);
                            activity.duration = ActivityService.getDuration(activity);

                            const activityEventCategory = eventCategories.find(ec => ec.event_id === activity.event_id);
                            let activityCategory: number;
                            if (activityEventCategory) {
                                activityCategory = activityEventCategory.category_id;
                            } else {
                                activityCategory = 1147;
                            }
                            const category = categories.find(cat => cat.category_id === activityCategory);

                            if (category) {
                                activity.category = category.title_en;
                            }

                        });


                        ActivityService.all = activities;
                        ActivityService.allById = activities.reduce((hashmap, currentValue) => {
                            hashmap[currentValue.event_id] = currentValue;
                            return hashmap;
                        }, {});
                    });

                });

            });


        }
    }

    static isInTheFuture(activity: Activity): boolean {
        let datestring = activity.date;
        if (activity.start_time) {
            datestring = `${activity.date} ${activity.start_time}`;
        }
        return Date.parse(datestring) > Date.now();
    }

    static getPrice(activity: Activity): string {
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

    static getDuration(activity: Activity): number {
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

    constructor(public httpClient: HttpClient) {
        ActivityService.initialize(this.httpClient);
    }

    getActivity(eventID: number): Observable<Activity> {
        let observable: Observable<Activity>;

        if (ActivityService.all) {
            observable = of(ActivityService.allById[eventID]);
        } else {
            observable = this.httpClient.get<Activity[]>(ActivityService.URL).pipe(map(val => val.find(act => act.event_id == eventID)));
        }
        return observable;
    }

    getMultipleActivities(startInt: number, endInt: number): Observable<Activity[]> {
        let observable: Observable<Activity[]>;

        if (ActivityService.all) {
            observable = of(ActivityService.all.slice(startInt, endInt));
        } else {
            observable = this.httpClient.get<Activity[]>(ActivityService.URL).pipe(map(x => x.slice(startInt, endInt)));
        }

        return observable;
    }


}

