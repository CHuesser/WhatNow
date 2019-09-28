import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../activity.service';
import {Activity} from '../types';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    items: Activity[];
    private priceSorted: boolean;
    private timeSorted: boolean;

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
        this.activityService.getMultipleActivities(1, 21).subscribe(value => this.items = value);
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
