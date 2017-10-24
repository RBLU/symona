import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchrunListItemComponent } from './batchrun-list-item.component';

describe('BatchrunListItemComponent', () => {
  let component: BatchrunListItemComponent;
  let fixture: ComponentFixture<BatchrunListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchrunListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchrunListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
