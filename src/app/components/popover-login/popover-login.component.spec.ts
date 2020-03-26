import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverLoginComponent } from './popover-login.component';

describe('PopoverLoginComponent', () => {
  let component: PopoverLoginComponent;
  let fixture: ComponentFixture<PopoverLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
