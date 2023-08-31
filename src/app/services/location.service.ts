import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  coordinate: Coordinate = new Coordinate();

  constructor() {}

  getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.coordinate.latitude = position.coords.latitude;
          this.coordinate.longitutde = position.coords.longitude;
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
     return this.coordinate;
  }
}

export class Coordinate {
  latitude = 16.8565435;
  longitutde = 96.1208935;
}
