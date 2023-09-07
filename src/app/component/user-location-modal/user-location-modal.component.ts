import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordinate, LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-user-location-modal',
  templateUrl: './user-location-modal.component.html',
  styleUrls: ['./user-location-modal.component.css'],
})
export class UserLocationModalComponent implements OnInit {
  isChooseonMap = false;
  coordinate: Coordinate = new Coordinate();

  constructor(
    public modal: NgbActiveModal,
    private _locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._locationService.initialUserLocation();
    this.coordinate = this._locationService.getUserCoordinate();
  }

  showMap(): void {
    this.isChooseonMap = true;
  }

  getLocation() {
    this.isChooseonMap = false;
    this.searchLocations();
  }

  searchLocations(): void {
    this.modal.close();
    this.router.navigate(['/', 'list']);
  }
}
