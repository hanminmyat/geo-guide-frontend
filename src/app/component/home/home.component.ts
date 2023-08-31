import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLocationModalComponent } from '../user-location-modal/user-location-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openLocationModal() {
    const modalRef = this.modalService.open(UserLocationModalComponent, {
      windowClass: 'user-location',
    });
  }
}
