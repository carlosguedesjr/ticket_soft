import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepThreeComponent } from './checkout-step-three.component';

describe('CheckoutStepThreeComponent', () => {
  let component: CheckoutStepThreeComponent;
  let fixture: ComponentFixture<CheckoutStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
