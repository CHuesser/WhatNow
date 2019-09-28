import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SBBLocation} from './types';
import {global} from '@angular/compiler/src/util';
import {map} from 'rxjs/operators';
import {getToken} from 'codelyzer/angular/styles/cssLexer';

@Injectable({
  providedIn: 'root'
})
export class SbbdestinationService {

  constructor(private httpClient: HttpClient) { }

  public getToken() {
    return this.httpClient.post<any>(`https://sso.sbb.ch/auth/realms/SBB_Public/protocol/openid-connect/token?grant_type=client_credentials&client_id=${ClientID}&client_secret=${ClientSecret}`, null).pipe(
        map(t => t.access_token));
  }

  public getLocation(cityID: string) {
    this.getToken().subscribe(token => {

      this.httpClient.get<SBBLocation[]>(LocationAPI + cityID, {headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
          'X-Contract-Id': ContractID
        })
      }).subscribe(city =>
          console.log(city));
    });
  }
}

const ContractID = 'HAC222P';
const ClientID =  '22ebc2be';
const ClientSecret = '2c820784f3e28837959abc43120989ca';
const LocationAPI = 'https://b2p.app.sbb.ch/api/locations?name=';

