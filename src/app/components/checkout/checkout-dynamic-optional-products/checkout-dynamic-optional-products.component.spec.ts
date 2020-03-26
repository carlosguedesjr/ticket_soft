import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDynamicOptionalProductsComponent } from './checkout-dynamic-optional-products.component';

describe('CheckoutDynamicOptionalProductsComponent', () => {
  let component: CheckoutDynamicOptionalProductsComponent;
  let fixture: ComponentFixture<CheckoutDynamicOptionalProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDynamicOptionalProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDynamicOptionalProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
