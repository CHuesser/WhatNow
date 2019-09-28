import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public isToggled = false;

  public duration = 4;
  public locationDescriptiveName = 'Zürich'; // TODO determine programatically
  public locationLatitude = 47.3788796;
  public locationlongitude = 8.538650199999999;

  constructor(private geolocation: Geolocation) {
  }

  ngOnInit(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.locationLatitude = position.coords.latitude;
      this.locationlongitude = position.coords.longitude;

      console.log('at position', position);
      // TODO fetch descriptive name from google api
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  notify() {
    this.isToggled = !this.isToggled;
  }

}
