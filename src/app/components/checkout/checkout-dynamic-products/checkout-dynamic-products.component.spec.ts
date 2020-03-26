import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDynamicProductsComponent } from './checkout-dynamic-products.component';

describe('CheckoutDynamicProductsComponent', () => {
  let component: CheckoutDynamicProductsComponent;
  let fixture: ComponentFixture<CheckoutDynamicProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDynamicProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDynamicProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
