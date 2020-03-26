import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMatSelectDinamycComponent } from './checkout-mat-select-dinamyc.component';

describe('MatSelectDinamycComponent', () => {
  let component: CheckoutMatSelectDinamycComponent;
  let fixture: ComponentFixture<CheckoutMatSelectDinamycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutMatSelectDinamycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMatSelectDinamycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
