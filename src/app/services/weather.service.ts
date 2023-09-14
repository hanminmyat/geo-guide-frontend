import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  backend_baseUrl = 'http://localhost:8000';
  private headers: HttpHeaders = new HttpHeaders();

  protected setHeaders() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
  }

  constructor(private http: HttpClient) {}

  getWeatherStatus(): Observable<any> {
    return this.http.get(
      `${this.backend_baseUrl}/api/get-weather-staus`,
      { headers: this.headers }
    );
  }
}

export class WeatherInfo {
  weatherText = '';
  precipitationType = '';
  weatherIcon = 0;
  isDayTime = false;
  temperature_metric:any;
}
