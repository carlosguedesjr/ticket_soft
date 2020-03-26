import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRowComponent } from './map-row.component';

describe('MapRowComponent', () => {
  let component: MapRowComponent;
  let fixture: ComponentFixture<MapRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
