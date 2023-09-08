import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: false,

})
export class DetailComponent implements OnInit{
  @Input()
  value = 4.7;
  location = "Pyay Road"
  open_status = "Close"
  ph_no = "+9597777777";
  web_site = "Website url"
  fullStars!: number;
  hasHalfStar!: boolean;
  emptyStars!: number;

  ngOnInit(): void {
    this.fullStars = Math.floor(this.value);
    this.hasHalfStar = this.value % 1 !== 0;
    this.emptyStars = 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    // this.emptyStars = 5 - this.fullStars  - (this.hasHalfStar ? 1 : 0);
  }

}


// import {MatButtonModule} from '@angular/material/button';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatCardModule} from '@angular/material/card';

// /**
//  * @title Card with footer
//  */
// @Component({

//   styleUrls: ['card-footer-example.css'],
//   standalone: true,
//   imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule],
// })
// export class CardFooterExample {
//   longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
//   from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
//   originally bred for hunting.`;
// }
