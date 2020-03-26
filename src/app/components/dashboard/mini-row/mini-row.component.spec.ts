import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniRowComponent } from './mini-row.component';

describe('MiniRowComponent', () => {
  let component: MiniRowComponent;
  let fixture: ComponentFixture<MiniRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
