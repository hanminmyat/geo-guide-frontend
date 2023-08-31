import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationModalComponent } from './user-location-modal.component';

describe('UserLocationModalComponent', () => {
  let component: UserLocationModalComponent;
  let fixture: ComponentFixture<UserLocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLocationModalComponent]
    });
    fixture = TestBed.createComponent(UserLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
