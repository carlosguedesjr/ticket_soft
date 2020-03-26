import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumRowComponent } from './medium-row.component';

describe('MediumRowComponent', () => {
  let component: MediumRowComponent;
  let fixture: ComponentFixture<MediumRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
