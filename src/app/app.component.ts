import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLocationModalComponent } from './component/user-location-modal/user-location-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'geo-guide-frontend';

  constructor(private modalService: NgbModal) { }

  openLocationModal() {
    const modalRef = this.modalService.open(UserLocationModalComponent, {windowClass: 'user-location', centered: true});
  }
}
