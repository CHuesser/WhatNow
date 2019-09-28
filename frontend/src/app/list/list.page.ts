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
        this.activityService.getMultipleActivities().subscribe(value => this.items = value);
    }
}
