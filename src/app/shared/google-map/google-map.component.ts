import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Coordinate, LocationService } from 'src/app/services/location.service';
import { GoogleMap } from '@angular/google-maps';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  @Input() lat = 16.8565335;
  @Input() lng = 96.1208935;
  @Input() zoomPixel = 15;
  coordinate = new Coordinate();

  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  options: google.maps.MapOptions = {
    zoom: 16,
  };

  map: GoogleMap | undefined;

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
    // this.markerPosition = { lat: this.coordinate.latitude, lng: this.coordinate.longitutde };
    // this.options.center = new google.maps.LatLng(
    //   this.coordinate.latitude,
    //   this.coordinate.longitutde
    // );
  }

  initializeMap() {
    this.options.center = new google.maps.LatLng(this.lat, this.lng);
    this.markerPosition.lat = this.lat;
    this.markerPosition.lng = this.lng;
    this.options.zoom = this.zoomPixel;
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
    this._locationService.setUserLocation(
      clickedLocation.lat,
      clickedLocation.lng
    );
  }
}
