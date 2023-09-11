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
  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  options: google.maps.MapOptions = {
    center: new google.maps.LatLng(this.lat, this.lng),
    zoom: 14,
  };

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.coordinate = this._locationService.getUserCoordinate();
    this.markerPosition = { lat: this.coordinate.latitude, lng: this.coordinate.longitutde };
    this.options.center = new google.maps.LatLng(
      this.coordinate.latitude,
      this.coordinate.longitutde
    );
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    const clickedLocation = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    };

    this.options = {
      center: new google.maps.LatLng(clickedLocation.lat, clickedLocation.lng),
      zoom: 16,
    };

    this.markerPosition = clickedLocation;
    this._locationService.setUserLocation(clickedLocation.lat, clickedLocation.lng);
  }
}
