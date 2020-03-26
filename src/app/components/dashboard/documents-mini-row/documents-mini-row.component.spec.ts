import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsMiniRowComponent } from './documents-mini-row.component';

describe('DocumentsMiniRowComponent', () => {
  let component: DocumentsMiniRowComponent;
  let fixture: ComponentFixture<DocumentsMiniRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsMiniRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsMiniRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
