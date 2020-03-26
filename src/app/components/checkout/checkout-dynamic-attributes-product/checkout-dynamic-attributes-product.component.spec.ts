import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDynamicAttributesProductComponent } from './checkout-dynamic-attributes-product.component';

describe('CheckoutDynamicAttributesProductComponent', () => {
  let component: CheckoutDynamicAttributesProductComponent;
  let fixture: ComponentFixture<CheckoutDynamicAttributesProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDynamicAttributesProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDynamicAttributesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
