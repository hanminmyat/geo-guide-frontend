import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private coordinate: Coordinate = new Coordinate();
  private headers: HttpHeaders = new HttpHeaders();

  backend_baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  protected setHeaders() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  setUserLocation(position: GeolocationPosition) {
    this.coordinate.latitude = position.coords.latitude;
    this.coordinate.longitutde = position.coords.longitude;
  }

  getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setUserLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
    //  return this.coordinate;
  }

  getUserCoordinate() {
    return this.coordinate;
  }

  getNearbyLocations(
    lat: number,
    log: number,
    distance: number
  ): Observable<any> {
    return this.http.get(
      `${this.backend_baseUrl}/api/nearby_locations?lat=${lat}&log=${log}&distance=${distance}`
      , { headers: this.headers });
  }
}

export class Coordinate {
  latitude = 16.8565435;
  longitutde = 96.1208935;
}

export class NearbyLocation {
  business_status: string = '';
  icon = '';
  name: string = '';
  place_id: string = '';
  type: any;
  rating: number = 0;
  price_level = 0;
  vicinity: string = '';
  open_now = false;
}
