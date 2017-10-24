import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchrunDetailComponent } from './batchrun-detail.component';

describe('BatchrunDetailComponent', () => {
  let component: BatchrunDetailComponent;
  let fixture: ComponentFixture<BatchrunDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchrunDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchrunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
