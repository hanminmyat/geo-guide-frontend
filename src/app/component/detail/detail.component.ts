import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LocationDetail,
  LocationService,
  NearbyLocation,
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
  relatedLocations: NearbyLocation[] = [];
  estimateTime = '';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._locationService.checkUserLocation();
    // this.relatedLocations =
    //   this._locationService.getRelatedRecommendLocations();
    this.route.params.subscribe((params) => {
      this.placeId = params['id'];
      this.getLocationDetail();
      this.initMap();
    });
  }

  getLocationDetail() {
    this._locationService.getLocationDetail(this.placeId).subscribe((data) => {
      if (data) {
        this.detailInfo = data;
        this._locationService.getRelatedRecommendLocations(this.detailInfo!).then((result) => {
          this.relatedLocations = result;
          console.log(this.relatedLocations)
        });
      }
    });
  }

  initMap() {
    this.mapOptions = {
      center: {
        lat: this.detailInfo?.lat_lng.lat,
        lng: this.detailInfo?.lat_lng.lng,
      },
      zoom: 15, // Set the initial zoom level
    };

    this.markerPosition = {
      lat: this.detailInfo?.lat_lng.lat,
      lng: this.detailInfo?.lat_lng.lng,
    };
  }

  checkDetail(placeId: string) {
    this.router
      .navigateByUrl('/detail', { skipLocationChange: true })
      .then(() => this.router.navigate(['/detail', placeId]));
  }

  getRatingStars(rating: number) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const halfStar = rating - fullStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(true);
    }

    if (halfStar) {
      stars.push(0.5);
    }

    for (let i = 0; i < emptyStars; i++) {
      if (stars.length < 5) {
        stars.push(false);
      }
    }
    return stars;
  }

  getEstimateDuration(eventValue: string) {
    this.estimateTime = eventValue;
  }
}
