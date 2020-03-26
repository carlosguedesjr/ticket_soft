import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableActionsComponent } from './data-table-actions.component';

describe('DataTableComponent', () => {
  let component: DataTableActionsComponent;
  let fixture: ComponentFixture<DataTableActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
