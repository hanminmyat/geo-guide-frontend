import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  isUserLocationAllowed = false;
  coordinate: Coordinate = new Coordinate();
  @Output() searchCustomLocationEvent = new EventEmitter<boolean>();

  constructor(
    public modal: NgbActiveModal,
    private _locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._locationService.initializeUserLocation().then((result) => {
      this.isUserLocationAllowed = result;
    });

    this.coordinate = this._locationService.getUserCoordinate();
  }

  showMap(): void {
    this.isChooseonMap = true;
  }

  trackUserLocation() {
    this.isChooseonMap = false;
    this._locationService.trackUserLocation();
    this.searchLocations();
  }

  searchLocations(): void {
    console.log(this.coordinate);
    this.modal.close();
    this.router
      .navigateByUrl('/', { skipLocationChange: true, replaceUrl: true })
      .then(() => this.router.navigate(['/', 'list']));
  }
}
