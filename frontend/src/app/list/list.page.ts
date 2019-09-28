import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../activity.service';
import {Activity} from '../types';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    items: Activity[];
    private priceSorted: boolean;
    private timeSorted: boolean;
    private duration: number;
    private readonly TRAVEL_TIME_PLATFORM_MAX_DURATION_SECONDS = 14400;

    constructor(private activityService: ActivityService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(q => {

            this.duration = Math.min(q.duration * 60 * 60, this.TRAVEL_TIME_PLATFORM_MAX_DURATION_SECONDS);
            console.log(q.duration, this.duration);

            this.activityService.getMultipleActivities(1, 21).subscribe(value => {
                this.activityService.findActivities(47.3788796, 8.538650199999999, value, this.duration).subscribe(found => {
                    console.log(found);
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
                if (Number(a.duration) > Number(b.duration)) {
                    return -1;
                }
                if (Number(b.duration) > Number(a.duration)) {
                    return 1;
                }
                return 0;
            });
        }
        return this.items;
    }
}
