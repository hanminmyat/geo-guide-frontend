import { Component, OnInit } from '@angular/core';
import { Coordinate, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  lat = 16.8565435;
  lng = 96.1208935;
  coordinate = new Coordinate();
  options: google.maps.MapOptions = {
    center: new google.maps.LatLng(this.lat, this.lng),
    zoom: 14,
  };

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.coordinate = this._locationService.getUserCoordinate();
    this.options.center = new google.maps.LatLng(
      this.coordinate.latitude,
      this.coordinate.longitutde
    );
  }
}
