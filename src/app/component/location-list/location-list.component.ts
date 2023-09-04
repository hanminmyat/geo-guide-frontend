import { Component, OnInit } from '@angular/core';
import { LocationService, NearbyLocation } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  lat = 16.8565435;
  lng = 96.1208935;
  distance = 1000;
  nearbyLocations: NearbyLocation[] = [];

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this._locationService.getNearbyLocations(this.lat,this.lng, this.distance).subscribe((data) => {
      this.nearbyLocations = data;
      console.log(data);
    });
  }
}
