import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SbbJsonService} from '../sbb-json.service';
import {HttpClient} from '@angular/common/http';
import {Settings} from '../settings';
import {ReverseGeocodingResponse} from '../geolocationapi';


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

    constructor(private geolocation: Geolocation, private sbbJson: SbbJsonService, private httpClient: HttpClient) {
        Settings.initialize(httpClient);
    }

    ngOnInit(): void {
        this.geolocation.getCurrentPosition().then((position) => {
            this.locationLatitude = position.coords.latitude;
            this.locationlongitude = position.coords.longitude;

            this.httpClient.get<ReverseGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.locationLatitude},${this.locationlongitude}&result_type=locality&language=en-GB&key=${Settings.googleMapsPlatformKey}`).subscribe(data => {
                if (data.results) {
                    const location = data.results.find(res => res.types.some(s => s === 'political') &&
                        res.types.some(s => s === 'locality'));
                    if (location) {
                        this.locationDescriptiveName = location.formatted_address;
                    }
                }
            });

            // this.sbbJson.getSbbDestinationsReachableFrom(this.locationLatitude, this.locationlongitude, 7200);

        }).catch((error) => {
                console.log('Error getting location', error);
            }
        );
    }

    notify() {
        this.isToggled = !this.isToggled;
    }

}
