import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isToggled = false;

  public duration = 4;
  public location = 'Zürich'; // TODO determine programatically

  constructor() {
  }

  notify() {
    this.isToggled = !this.isToggled;
  }

}
