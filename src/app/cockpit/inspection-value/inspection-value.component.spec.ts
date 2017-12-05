import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionValueComponent } from './inspection-value.component';

describe('InspectionValueComponent', () => {
  let component: InspectionValueComponent;
  let fixture: ComponentFixture<InspectionValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
