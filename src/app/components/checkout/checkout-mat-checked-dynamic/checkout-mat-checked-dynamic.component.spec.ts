import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMatCheckedDynamicComponent } from './checkout-mat-checked-dynamic.component';

describe('CheckoutMatCheckedDynamicComponent', () => {
  let component: CheckoutMatCheckedDynamicComponent;
  let fixture: ComponentFixture<CheckoutMatCheckedDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutMatCheckedDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMatCheckedDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
