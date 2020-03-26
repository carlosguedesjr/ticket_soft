import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverProfileComponent } from './popover-profile.component';

describe('PopoverProfileComponent', () => {
  let component: PopoverProfileComponent;
  let fixture: ComponentFixture<PopoverProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
