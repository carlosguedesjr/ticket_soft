import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterModalityComponent } from './filter-modality.component';

describe('FilterModalityComponent', () => {
  let component: FilterModalityComponent;
  let fixture: ComponentFixture<FilterModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
