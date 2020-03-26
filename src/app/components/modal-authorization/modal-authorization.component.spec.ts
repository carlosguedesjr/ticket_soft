import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuthorizationComponent } from './modal-authorization.component';

describe('ModalAuthorizationComponent', () => {
  let component: ModalAuthorizationComponent;
  let fixture: ComponentFixture<ModalAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
