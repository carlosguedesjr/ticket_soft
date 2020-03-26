import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCostumerCheckoutComponent } from './profile-costumer-checkout.component';

describe('ProfileCostumerCheckoutComponent', () => {
  let component: ProfileCostumerCheckoutComponent;
  let fixture: ComponentFixture<ProfileCostumerCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCostumerCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCostumerCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
