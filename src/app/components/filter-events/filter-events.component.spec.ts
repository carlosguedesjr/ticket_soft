import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEventsComponent } from './filter-events.component';

describe('FilterEventsComponent', () => {
  let component: FilterEventsComponent;
  let fixture: ComponentFixture<FilterEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
