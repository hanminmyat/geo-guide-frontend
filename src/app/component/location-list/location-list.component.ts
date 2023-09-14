import { Component, OnInit } from '@angular/core';
import {
  LocationService,
  NearbyLocation,
} from 'src/app/services/location.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  distance = 10000; // default radius
  type = '';
  open_status: boolean | undefined;
  isLastPage = false;
  nextPageToken = '';
  nearbyLocations: NearbyLocation[] = [];
  filteredLocations: NearbyLocation[] = [];
  topFiveLocations: NearbyLocation[] = [];
  items: MenuItem[] = [];

  activeCategoryItemIndex: number = -1;
  activeRangeItemIndex = -1;
  activeRatingItemIndex = -1;
  activeStatusItemIndex = -1;

  showSpinner = false;

  constructor(
    private _locationService: LocationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this._locationService.checkUserLocation();
    this.getLocations();
    this.initializeMenuItems();
  }

  searchCustomLocationFromModal(event: boolean) {
    console.log(event);
    if (event) {
      this.getLocations();
    }
  }

  getLocations(): void {
    this.showSpinner = true;
    this._locationService
      .getNearbyLocations(this.distance, this.type, this.nextPageToken)
      .subscribe((data) => {
        this.nextPageToken = data['nextpage_token'];
        this.isLastPage = data['last_page'];
        this.nearbyLocations = data['locations'];
        this.setFilterOptions();
      });
  }

  setFilterOptions() {
    var typesToCheck = this.type.split('|');
    var results = this.nearbyLocations.filter((location) => {
      if (this.type.length > 0) {
        return location.types.some((type: string) =>
          typesToCheck.includes(type)
        );
      } else {
        return location.business_status;
      }
    });

    results = this.sortFilteredLocations(results);

    this.filteredLocations.push(...results);

    if (this.nextPageToken) {
      this.getLocations();
    } else {
      this.showSpinner = false;
    }
  }

  sortFilteredLocations(list: NearbyLocation[]): NearbyLocation[] {
    if (this.activeStatusItemIndex == 0) {
      list = list.filter((location) => location.open_now == true);
    }

    if (this.activeRatingItemIndex == 0) {
      list.sort((locationA, locationB) => locationB.rating - locationA.rating);
    } else if (this.activeRatingItemIndex == 1) {
      list.sort((locationA, locationB) => locationA.rating - locationB.rating);
    }
    return list;
  }

  getMostRecommendLists(placeIdToOmit: string) {
    this.topFiveLocations = this.filteredLocations
      .filter(
        (location) => location.open_now && location.place_id != placeIdToOmit
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    this._locationService.setRelatedRecommendLocations(this.topFiveLocations);
  }

  resetFilter(): void {
    this.distance = 50000; //reset default radius
    this.type = '';
    this.activeCategoryItemIndex = -1;
    this.activeRangeItemIndex = -1;
    this.activeRatingItemIndex = -1;
    this.activeStatusItemIndex = -1;

    // remove sub filter Item Active style
    for (let item of this.items) {
      if (item.items) {
        for (let subItem of item.items) {
          subItem.styleClass = '';
        }
      }
    }

    this.getLocations();
  }

  resetLocations(): void {
    this.resetFilter();
    this.getLocations();
  }

  clickNextPage(): void {
    this.getLocations();
  }

  getLocationTypeLabel(label: string) {
    if (label == 'gas') {
      return 'gas_station';
    } else if (label == 'shopping') {
      return 'shopping_mall';
    } else if (label == 'groceries') {
      return 'convenience_store|store';
    } else if (label == 'hotels') {
      return 'hotels|lodging';
    } else if (label == 'restaurants') {
      return 'restaurant|food';
    } else {
      return label;
    }
  }

  filterByCategory(event: MenuItemCommandEvent) {
    this.handleActiveCategoryMenuItemStyle(event);

    this.type = this.getLocationTypeLabel(
      event.item?.label?.toLocaleLowerCase() || ''
    );
    // clear the filtered location
    this.filteredLocations = [];
    this.getLocations();
  }

  setRange(event: MenuItemCommandEvent) {
    this.handleActiveRangeMenuItemStyle(event);
    this.distance = Number(event.item?.id);
    this.filteredLocations = [];
    this.getLocations();
  }

  sortByRating(event: MenuItemCommandEvent) {
    this.handleActiveRatingMenuItemStyle(event);
    this.filteredLocations = this.sortFilteredLocations(this.filteredLocations);
  }

  filterByStatus(event: MenuItemCommandEvent) {
    this.handleActiveStatusMenuItemStyle(event);
    this.filteredLocations = this.sortFilteredLocations(this.filteredLocations);
  }

  handleActiveCategoryMenuItemStyle(event: MenuItemCommandEvent) {
    // remove active style from previous clicked item
    if (this.activeCategoryItemIndex >= 0) {
      let cateloryItems = this.items[0].items as MenuItem[];
      cateloryItems[this.activeCategoryItemIndex].styleClass = '';
    }

    let targetItem = event.item as MenuItem;
    targetItem.styleClass = 'activeItem';
    this.activeCategoryItemIndex = Number(targetItem.tabindex);
  }

  handleActiveRangeMenuItemStyle(event: MenuItemCommandEvent) {
    if (this.activeRangeItemIndex >= 0) {
      let rangeMenuItems = this.items[1].items as MenuItem[];
      rangeMenuItems[this.activeRangeItemIndex].styleClass = '';
    }

    let targetItem = event.item as MenuItem;
    targetItem.styleClass = 'activeItem';
    this.activeRangeItemIndex = Number(targetItem.tabindex);
  }

  handleActiveRatingMenuItemStyle(event: MenuItemCommandEvent) {
    if (this.activeRatingItemIndex >= 0) {
      let ratingMenuItems = this.items[2].items as MenuItem[];
      ratingMenuItems[this.activeRatingItemIndex].styleClass = '';
    }

    let targetItem = event.item as MenuItem;
    targetItem.styleClass = 'activeItem';
    this.activeRatingItemIndex = Number(targetItem.tabindex);
  }

  handleActiveStatusMenuItemStyle(event: MenuItemCommandEvent) {
    if (this.activeStatusItemIndex >= 0) {
      let statusMenuItems = this.items[3].items as MenuItem[];
      statusMenuItems[this.activeStatusItemIndex].styleClass = '';
    }
    let targetItem = event.item as MenuItem;
    this.activeStatusItemIndex = Number(targetItem.tabindex);
  }

  showDetail(id: string) {
    this.getMostRecommendLists(id);
    this.route.navigate(['/detail', id]);
  }

  initializeMenuItems(): void {
    this.items = [
      {
        label: 'Categories',
        icon: 'fas fa-filter',
        items: [
          {
            label: 'Restaurants',
            icon: 'fas fa-utensils',
            tabindex: '0',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'Gas',
            icon: 'fas fa-gas-pump',
            title: 'gas_station',
            tabindex: '1',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'Hotels',
            icon: 'fas fa-bed',
            tabindex: '2',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'Cafe',
            icon: 'fas fa-coffee',
            tabindex: '3',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'Shopping',
            icon: 'fas fa-shopping-bag',
            tabindex: '4',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'Groceries',
            icon: 'fas fa-shopping-cart',
            tabindex: '5',
            command: this.filterByCategory.bind(this),
          },
          {
            label: 'ATM',
            icon: 'fas fa-credit-card',
            tabindex: '6',
            command: this.filterByCategory.bind(this),
          },
        ],
      },
      {
        label: 'Range',
        icon: 'far fa-compass',
        items: [
          {
            label: '50 Km',
            id: '50000',
            tabindex: '0',
            icon: 'far fa-circle',
            command: this.setRange.bind(this),
          },
          {
            label: '100 Km',
            id: '1000000',
            tabindex: '1',
            icon: 'far fa-circle',
            command: this.setRange.bind(this),
          },
          {
            label: '150 Km',
            id: '1500000',
            tabindex: '2',
            icon: 'far fa-circle',
            command: this.setRange.bind(this),
          },
          {
            label: '200 Km',
            id: '2000000',
            tabindex: '3',
            icon: 'far fa-circle',
            command: this.setRange.bind(this),
          },
          {
            label: '250 Km',
            id: '2500000',
            tabindex: '4',
            icon: 'far fa-circle',
            command: this.setRange.bind(this),
          },
        ],
      },
      {
        label: 'Rating',
        icon: 'far fa-star',
        items: [
          {
            label: 'Sort by highest',
            tabindex: '0',
            icon: 'fas fa-sort-amount-up',
            command: this.sortByRating.bind(this),
          },
          {
            label: 'Sort by lowest',
            tabindex: '1',
            icon: 'fas fa-sort-amount-down',
            command: this.sortByRating.bind(this),
          },
        ],
      },
      {
        label: 'Status',
        icon: 'far fa-calendar',
        items: [
          {
            label: 'Open Now',
            tabindex: '0',
            icon: 'far fa-clock',
            command: this.filterByStatus.bind(this),
          },
        ],
      },
      {
        label: 'Reset',
        icon: 'fa fa-redo',
        command: this.resetFilter.bind(this),
      },
    ];
  }
}
