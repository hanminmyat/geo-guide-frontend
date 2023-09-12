import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  setUserLocation(lat: number, lng: number) {
    this.coordinate.latitude = lat;
    this.coordinate.longitutde = lng;
  }

  initialUserLocation() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       this.setUserLocation(
    //         position.coords.latitude,
    //         position.coords.longitude
    //       );
    //     },
    //     (error) => {
    //       console.error('Error getting location:', error.message);
    //       alert('Please Allow Location Service!');
    //     }
    //   );
    // }
  }

  getUserCoordinate() {
    return this.coordinate;
  }

  getNearbyLocations(
    distance: number,
    type: string,
    nextpage_token: string
  ): Observable<any> {
    return this.http.get(
      `${this.backend_baseUrl}/api/nearby-locations?lat=${this.coordinate.latitude}&log=${this.coordinate.longitutde}&distance=${distance}&type=${type}&nextpage_token=${nextpage_token}`,
      { headers: this.headers }
    );
  }

  getLocationDetail(placeId: string): Observable<any> {
    return this.http.get(
      `${this.backend_baseUrl}/api/location-detail?placeId=${placeId}`,
      { headers: this.headers }
    );
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
  types: any;
  rating: number = 0;
  price_level = 0;
  vicinity: string = '';
  open_now = false;
}

export class LocationDetail {
  name: string = '';
  logo_or_image = '';
  lat_lng: any;
  phoneNo = '';
  open_now = false;
  address = '';
  rating = '';
  open_hours = [];
  top_reviews = [];
}
