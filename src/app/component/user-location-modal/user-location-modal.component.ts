import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@Component({
  selector: 'app-user-location-modal',
  templateUrl: './user-location-modal.component.html',
  styleUrls: ['./user-location-modal.component.css'],
})
export class UserLocationModalComponent implements OnInit {
  isChooseonMap = false;
  isTrackMe = false;
  latitude = 0.0;
  longitude = 0.0;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
      
  }

  showMap(): void {
    this.isChooseonMap = true;
    this.isTrackMe = false;
  }

  getLocation() {
    this.isChooseonMap = false;
    this.isTrackMe = true;
    console.log('get Location')
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not available.');
    }
  }
}
