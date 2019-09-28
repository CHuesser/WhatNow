import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isToggled = false;

  public duration: number;

  constructor() {
    this.duration = 2;
  }

  notify() {
    this.isToggled = !this.isToggled;
  }

}
