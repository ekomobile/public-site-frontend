import { Component, OnInit, OnDestroy } from '@angular/core';
import {AppContentManagerService, City, Segment} from "../../services/app-content-manager.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public citiesList: City[] = [];
  public segmentsList: Segment[] = [];
  public currentCity?: City;
  public currentSegment?: Segment;
  private citiesListSubscription?: Subscription;
  private segmentsListSubscription?: Subscription;

  constructor(private contentManagerService: AppContentManagerService) { }
  private updateCurrentCity () {
    this.currentCity = this.contentManagerService.getCurrentCity();
  }
  private updateCurrentSegment () {
    this.currentSegment = this.contentManagerService.getCurrentSegment();
  }


  ngOnInit(): void {
    this.citiesListSubscription = this.contentManagerService.getCitiesList()
      .subscribe((cities) => {
        cities.forEach((city) => {
          this.citiesList.push(city);
        });
      });

    this.segmentsListSubscription = this.contentManagerService.getSegmentsList()
      .subscribe((segments) => {
        segments.forEach((segments) => {
          this.segmentsList.push(segments);
        });
      });
    this.updateCurrentCity();
    this.updateCurrentSegment();
  }

  ngOnDestroy(): void {
    if (this.citiesListSubscription) {
      this.citiesListSubscription.unsubscribe();
    }
    if (this.segmentsListSubscription) {
      this.segmentsListSubscription.unsubscribe();
    }
  }
}
