import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InspectionValueComponent} from './inspection-value.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockInspectionService, MockMonitoringService, MockProvider} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from "@angular/core";
import {D3Service} from "d3-ng2-service";
import {InspectionService} from "../../core/inspection.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Inspection} from "../../core/models/inspection";

describe('InspectionValueComponent', () => {
  let component: InspectionValueComponent;
  let fixture: ComponentFixture<InspectionValueComponent>;

  @Component({
    selector: 'inspection-history',
    template: '<div>Mock Inspection History</div>',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None
  })
  class MockInspectionHistoryComponent {

    @Input() inspectionBoid: string;
    @Input() currentRunBoid: string;
    @Input() width: number = 200;
    @Input() height: number = 200;
    @Input() margin: number = 50;
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionValueComponent, MockInspectionHistoryComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService},
        {provide: InspectionService, useClass: MockInspectionService},
        D3Service
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionValueComponent);
    component = fixture.componentInstance;
    component.inspection = MockProvider.mockInspection;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
