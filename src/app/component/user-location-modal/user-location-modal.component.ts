import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinate, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-user-location-modal',
  templateUrl: './user-location-modal.component.html',
  styleUrls: ['./user-location-modal.component.css'],
})
export class UserLocationModalComponent implements OnInit {
  isChooseonMap = false;
  isTrackMe = false;
  coordinate: Coordinate = new Coordinate();

  constructor(
    public modal: NgbActiveModal,
    private _locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.coordinate = this._locationService.getUserLocation();
    console.log(this.coordinate);
  }

  showMap(): void {
    this.isChooseonMap = true;
    this.isTrackMe = false;
  }

  getLocation() {
    this.isChooseonMap = false;
    this.isTrackMe = true;
  }
}
