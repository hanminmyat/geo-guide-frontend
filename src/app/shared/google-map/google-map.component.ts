import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Coordinate, LocationService } from 'src/app/services/location.service';
import { MapDirectionsService } from '@angular/google-maps';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  @Input() lat = 0;
  @Input() lng = 0;
  @Input() zoomPixel = 15;
  @Input() showRoute = false;
  coordinate = new Coordinate();

  @Output() estimateTimeEvent: EventEmitter<string> =
    new EventEmitter<string>();

  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  options: google.maps.MapOptions = {
    zoom: 16,
  };

  directionResult: google.maps.DirectionsResult | undefined;
  directionsRenderer: google.maps.DirectionsRenderer | undefined;
  estimatedDuration: string | undefined; // Property to store the estimated duration

  constructor(private _locationService: LocationService) {}

  ngOnInit(): void {
    this.initializeMap();
    if (this.showRoute) {
      this.showDirection();
    }
  }

  showDirection() {
    this.coordinate = this._locationService.getUserCoordinate();
    console.log(this.coordinate);
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new google.maps.LatLng(
          this.coordinate.latitude,
          this.coordinate.longitutde
        ),
        destination: new google.maps.LatLng(this.lat, this.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        console.log(response);
        if (status == 'OK' && response) {
          this.directionResult = response!;

          if (response!.routes && response!.routes.length > 0) {
            const route = response.routes[0];
            if (route.legs && route.legs.length > 0) {
              this.estimatedDuration = route.legs[0].duration!.text;
              this.estimateTimeEvent.emit(this.estimatedDuration);
            }
          }

          if (
            this.directionResult &&
            this.directionResult.routes &&
            this.directionResult.routes.length > 0
          ) {
            this.directionsRenderer = new google.maps.DirectionsRenderer({
              suppressMarkers: true,
              directions: this.directionResult,
            });
          }
        }
      }
    );
  }

  initializeMap() {
    this.options.center = new google.maps.LatLng(this.lat, this.lng);
    this.options.zoom = this.zoomPixel;
    if (!this.showRoute) {
      this.markerPosition.lat = this.lat;
      this.markerPosition.lng = this.lng;
    }
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

    if (!this.showRoute) {
      // disable showing map pin icon in user click on map
      this.markerPosition = clickedLocation;
    }

    this._locationService.setUserLocation(
      clickedLocation.lat,
      clickedLocation.lng
    );
  }
}
