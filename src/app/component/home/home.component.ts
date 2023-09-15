import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserLocationModalComponent } from '../user-location-modal/user-location-modal.component';
import { WeatherInfo, WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  weatherInfo: WeatherInfo | undefined;
  ideaText = {
    label: '',
    type: -1,
  };

  weatherCondition = '';
  constructor(
    private modalService: NgbModal,
    private _weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWeatherInfo();
  }

  getWeatherInfo() {
    this._weatherService.getWeatherStatus().subscribe((result) => {
      this.weatherInfo = result;
      this.weatherCondition = this.weatherInfo!.weatherText.toLowerCase();
      console.log(this.weatherInfo);
      this.generateIdeaText();
    });
  }

  generateIdeaText() {
    let isLunchTime = this.checkLunchTime();

    if (
      (this.weatherCondition === 'cloudy' ||
        this.weatherCondition === 'rainy' ||
        this.weatherCondition === 'mostly cloudy') &&
      !isLunchTime
    ) {
      this.ideaText.type = 0;
      this.ideaText.label = 'Embrace the weather with a cozy coffee!';
    } else if (isLunchTime) {
      this.ideaText.type = 1;
      this.ideaText.label = 'Savor the sunshine, dine out nearby!';
    } else {
      this.ideaText.type = 2;
      this.ideaText.label = 'Any exciting plans for today?';
    }
  }

  checkLunchTime(): boolean {
    const currentTime = new Date();

    const lunchStartTime = new Date();
    lunchStartTime.setHours(11, 0, 0); // Assuming lunch starts at 11:00 AM

    const lunchEndTime = new Date();
    lunchEndTime.setHours(13, 0, 0); // Assuming lunch ends at 1:00 PM

    return currentTime >= lunchStartTime && currentTime <= lunchEndTime;
  }

  openLocationModal() {
    const modalRef = this.modalService.open(UserLocationModalComponent, {
      windowClass: 'user-location',
      centered: true,
    });
  }

  showLocations(locationType: number) {
    this.router.navigate(['/', 'list'], {
      queryParams: { type: locationType },
    });
  }
}
