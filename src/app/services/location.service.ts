import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private coordinate: Coordinate = new Coordinate();
  private headers: HttpHeaders = new HttpHeaders();
  private relatedRecommendLocations: NearbyLocation[] = [];
  backend_baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  protected setHeaders() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  checkUserLocation() {
    if (this.coordinate.latitude == 0 && this.coordinate.longitutde == 0) {
      this.trackUserLocation();
    }
  }

  setUserLocation(lat: number, lng: number) {
    this.coordinate.latitude = lat;
    this.coordinate.longitutde = lng;
    console.log(this.coordinate);
  }

  initializeUserLocation(): Promise<boolean> {
    const isUserLocationAllow = new Promise<boolean>((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // this.setUserLocation(
            //   position.coords.latitude,
            //   position.coords.longitude
            // );
            this.trackUserLocation();
            resolve(true);
          },
          (error) => {
            console.error('Error getting location:', error.message);
            alert('Please Allow Location Service!');
            resolve(false);
          }
        );
      } else {
        resolve(false);
      }
    });
    return isUserLocationAllow;
  }

  trackUserLocation() {
    this.coordinate.latitude = 16.855863;
    this.coordinate.longitutde = 96.134881;
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

  setRelatedRecommendLocations(locations: NearbyLocation[]) {
    this.relatedRecommendLocations = locations;
  }

  // getRelatedRecommendLocations() {
  //   return this.relatedRecommendLocations;
  // }

  getRelatedRecommendLocations(
    selectedLocation: LocationDetail
  ): Promise<NearbyLocation[]> {
    let filterType1 = selectedLocation?.types[0] || '';
    let filterType2 = selectedLocation?.types[1] || '';
    let relatedLocations = new Promise<NearbyLocation[]>((resolve) => {
      this.getNearbyLocations(
        50000,
        selectedLocation.types.join('|'),
        ''
      ).subscribe((result) => {
        let locations = result.locations
          .filter(
            (location: NearbyLocation) =>
              (location.types.includes(filterType1) ||
                location.types.includes(filterType2)) &&
              location.rating > 3
          )
          .slice(0, 10);
        resolve(locations);
      });
    });

    return relatedLocations;
  }
}

export class Coordinate {
  latitude = 0;
  longitutde = 0;
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
  types = [];
}
