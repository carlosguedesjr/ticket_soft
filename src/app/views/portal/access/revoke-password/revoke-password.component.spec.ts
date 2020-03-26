import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokePasswordComponent } from './revoke-password.component';

describe('RevokePasswordComponent', () => {
  let component: RevokePasswordComponent;
  let fixture: ComponentFixture<RevokePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
