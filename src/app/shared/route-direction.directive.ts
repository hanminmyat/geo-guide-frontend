import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRouteDirections]',
})
export class RouteDirectionsDirective implements OnChanges {
  @Input() appRouteDirections: google.maps.DirectionsRequest | undefined;

  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  constructor() {
    this.directionsRenderer.setMap(null); // Initialize without a map
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRouteDirections'] && this.appRouteDirections) {
      this.calculateAndDisplayDirections(this.appRouteDirections);
    }
  }

  private calculateAndDisplayDirections(
    request: google.maps.DirectionsRequest
  ): void {
    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error calculating directions:', status);
      }
    });
  }
}
