import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../activity.service';
import {Activity} from '../types';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

    items: Activity[];

    constructor(private activityService: ActivityService) {
    }

    ngOnInit() {
        this.activityService.getMultipleActivities(1, 21).subscribe(value => {
            this.activityService.findActivities(47.3788796, 8.538650199999999, value).subscribe(found => {
                console.log(found);
                this.items = found;
            }, error => console.warn(error));
        });

    }
}
