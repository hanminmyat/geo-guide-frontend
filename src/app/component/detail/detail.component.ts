import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LocationDetail,
  LocationService,
} from 'src/app/services/location.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: false,
})
export class DetailComponent implements OnInit {
  @Input()
  value = 4.7;
  location = 'Pyay Road';
  open_status = 'Close';
  ph_no = '+9597777777';
  web_site = 'Website url';
  fullStars!: number;
  hasHalfStar!: boolean;
  emptyStars!: number;
  detailInfo: LocationDetail | undefined;

  placeId = '';
  mapOptions: google.maps.MapOptions = {
    zoom: 14,
  };

  markerPosition: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  constructor(
    private _locationService: LocationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fullStars = Math.floor(this.value);
    this.hasHalfStar = this.value % 1 !== 0;
    this.emptyStars = 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    this.route.params.subscribe((params) => {
      this.placeId = params['id'];
      console.log(this.placeId);
      this.getLocationDetail();
      this.initMap;
    });
  }

  getLocationDetail() {
    let place_id = 'ChIJh6NvViGVwTARkwudRkwn3sY';
    this._locationService.getLocationDetail(this.placeId).subscribe((data) => {
      if (data) {
        this.detailInfo = data;
        console.log(data);
      }
    });
  }

  initMap() {
    this.mapOptions = {
      center: {
        lat: this.detailInfo?.lat_lng.lat,
        lng: this.detailInfo?.lat_lng.lng,
      }, // Set your desired center coordinates
      zoom: 15, // Set the initial zoom level
      disableDefaultUI: true, // Disable default controls (zoom, pan, etc.)
      gestureHandling: 'none', // Disable all user interactions
    };

    this.markerPosition = {
      lat: this.detailInfo?.lat_lng.lat,
      lng: this.detailInfo?.lat_lng.lng,
    };
  }
}
