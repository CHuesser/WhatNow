import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../types';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {

  @Input()
  public activity: Activity;

  constructor() { }

  ngOnInit() {}

}
