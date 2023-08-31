import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  coordinate: Coordinate = new Coordinate();

  constructor() { }

  getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coordinate.latitude = position.coords.latitude;
          this.coordinate.longitutde = position.coords.longitude
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      this.coordinate.latitude = 16.8565435;
      this.coordinate.longitutde = 96.1208935;
    }
    return this.coordinate
  }
}

export class Coordinate {
  latitude= 0.0;
  longitutde=0.0;
}
