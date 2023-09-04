import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { UserLocationModalComponent } from './component/user-location-modal/user-location-modal.component';
import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';
import { LocationListComponent } from './component/location-list/location-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLocationModalComponent,
    HomeComponent,
    DetailComponent,
    LocationListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
