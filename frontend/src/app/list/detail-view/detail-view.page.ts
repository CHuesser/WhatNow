import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityService} from '../../activity.service';
import {Activity} from '../../types';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.page.html',
  styleUrls: ['./detail-view.page.scss'],
})
export class DetailViewPage implements OnInit {

  public activity: Activity;

  constructor(private route: ActivatedRoute, private activityService: ActivityService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activityService.getActivity(params.id).subscribe(value => {
        this.activity = value;
        console.log(params.id, value);
      });
    });
  }

}
