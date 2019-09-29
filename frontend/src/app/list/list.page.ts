import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../activity.service';
import {Activity} from '../types';
import {ActivatedRoute} from '@angular/router';
import {HasLocation, TraveldistanceService} from '../traveldistance.service';

class Cached {
    public activities: Activity[];
    public duration: number;
    public latitude: number;
    public longitude: number;
}

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private static cached: Cached = new Cached();

    items: Activity[];

    private priceSorted: boolean;
    private timeSorted: boolean;
    private readonly TRAVEL_TIME_PLATFORM_MAX_DURATION_SECONDS = 14400;

    constructor(private activityService: ActivityService, private route: ActivatedRoute, private distanceService: TraveldistanceService) {
    }


    ngOnInit() {

        this.route.queryParams.subscribe(q => {
            const duration = parseInt(q.duration, 10);
            const latitude = parseFloat(q.lat);
            const longitude = parseFloat(q.long);

            if (ListPage.cached && ListPage.cached.duration === duration
                && ListPage.cached.latitude === latitude && ListPage.cached.longitude === longitude) {
                this.items = ListPage.cached.activities;
                console.log('using cached activities', ListPage.cached);
                return;
            }

            const startingPoint: HasLocation = {
                address_latitude: latitude,
                address_longitude: longitude,
                event_id: 'startlocation'
            };

            this.activityService.getMultipleActivities(1, 100000)
                .subscribe(value => {

                    this.distanceService.filterReachableLocationsByTravelDistance(
                        startingPoint,
                        value,
                        Math.min(duration * 60 * 60, this.TRAVEL_TIME_PLATFORM_MAX_DURATION_SECONDS))
                        .subscribe((found: Activity[]) => {
                            console.log(found);

                            ListPage.cached.duration = duration;
                            ListPage.cached.latitude = latitude;
                            ListPage.cached.longitude = longitude;
                            ListPage.cached.activities = found;


                            this.items = found;
                        }, error => console.warn(error));
                });
        });
    }

    sortActivityByPrice(): Activity[] {
        this.priceSorted = !this.priceSorted;
        if (!this.priceSorted) {
            this.items.reverse();
        } else {
            this.items = this.items.sort((a, b) => {
                if (Number(a.price) > Number(b.price)) {
                    return -1;
                }
                if (Number(b.price) > Number(a.price)) {
                    return 1;
                }
                return 0;
            });
        }
        return this.items;
    }

    sortActivityByDuration(): Activity[] {
        this.timeSorted = !this.timeSorted;
        if (!this.timeSorted) {
            this.items.reverse();
        } else {
            this.items = this.items.sort((a, b) => {
                if (a.duration > b.duration) {
                    return -1;
                }
                if (b.duration > a.duration) {
                    return 1;
                }
                return 0;
            });
        }
        return this.items;
    }
}
