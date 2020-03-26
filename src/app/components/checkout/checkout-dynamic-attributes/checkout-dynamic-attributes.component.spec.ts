import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDynamicAttributesComponent } from './checkout-dynamic-attributes.component';

describe('CheckoutDynamicAttributesComponent', () => {
  let component: CheckoutDynamicAttributesComponent;
  let fixture: ComponentFixture<CheckoutDynamicAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDynamicAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDynamicAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
