import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepFourComponent } from './checkout-step-four.component';

describe('CheckoutStepFourComponent', () => {
  let component: CheckoutStepFourComponent;
  let fixture: ComponentFixture<CheckoutStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
