import {HttpClient} from '@angular/common/http';

export class Settings {
    public static googleMapsPlatformKey = '';
    public static traveltimeplatformClient = '';
    public static traveltimeplatformSecret = '';

    public static initialize(httpClient: HttpClient) {
        httpClient.get('./assets/secrets.json').subscribe((secrets: any) => {
            this.traveltimeplatformClient = secrets.traveltimeplatform.client;
            this.traveltimeplatformSecret = secrets.traveltimeplatform.secret;
            this.googleMapsPlatformKey = secrets.googlemaps.key;
            console.log('using credentials of the following traveltimeplatform client', this.traveltimeplatformClient);
        }, error => {
            console.warn('failed to load credentials for traveltimeplatform');
        });
    }
}
