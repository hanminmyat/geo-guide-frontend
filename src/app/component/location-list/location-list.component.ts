import { Component, OnInit } from '@angular/core';
import {
  LocationService,
  NearbyLocation,
} from 'src/app/services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  distance = 10000;
  type = 'restaurant';
  isLastPage = false;
  nextPageToken = '';
  nearbyLocations: NearbyLocation[] = [];

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this._locationService
      .getNearbyLocations(this.distance, this.type, this.nextPageToken)
      .subscribe((data) => {
        console.log(data);
        this.nextPageToken = data['nextpage_token'];
        this.isLastPage = data['last_page'];
        this.nearbyLocations = data['locations'];
      });
  }

  resetFilter(): void {
    this.nextPageToken = '';
    this.type = '';
  }

  resetLocations(): void {
    this.resetFilter();
    this.getLocations();
  }

  clickNextPage(): void {
    this.getLocations();
  }
}
