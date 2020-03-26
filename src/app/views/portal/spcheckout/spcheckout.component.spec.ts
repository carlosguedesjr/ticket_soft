import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcheckoutComponent } from './spcheckout.component';

describe('SpcheckoutComponent', () => {
  let component: SpcheckoutComponent;
  let fixture: ComponentFixture<SpcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
