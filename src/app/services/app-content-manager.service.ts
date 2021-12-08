import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


export interface City {
  id: number;
  name: string;
}

export interface Segment {
  id: number;
  name: string;
}

export interface MobileOperator {
  id: number;
  name: string;
  bg_color: string;
  font_color: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppContentManagerService {
  private apiUrl: string = environment.apiBaseUrl + "content_manager/";
  private currentCity: City = {id: 1, name: "Москва"};
  private currentSegment: Segment = {id: 1, name: "Частное лицо"};

  constructor(private http: HttpClient) {}

  public getCurrentCity() {
    return this.currentCity;
  }
  public setCurrentCity(city: City) {
    this.currentCity = city;
  }

  public getCurrentSegment() {
    return this.currentSegment;
  }
  public setCurrentSegment(segment: Segment) {
    this.currentSegment = segment;
  }

  public getCitiesList() {
    return this.http.get<Array<City>>(this.apiUrl + "cities/");
  }

  public getSegmentsList() {
    return this.http.get<Array<Segment>>(this.apiUrl + "segments/");
  }

  public getMobileOperatorsList() {
    return this.http.get<Array<MobileOperator>>(this.apiUrl + "mobile_operators");
  }
}
