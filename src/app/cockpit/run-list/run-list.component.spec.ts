import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchrunListComponent } from './run-list.component';

describe('BatchrunListComponent', () => {
  let component: BatchrunListComponent;
  let fixture: ComponentFixture<BatchrunListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchrunListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchrunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
