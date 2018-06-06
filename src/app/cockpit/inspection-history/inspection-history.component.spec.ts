import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHistoryComponent } from './inspection-history.component';
import {MonitoringService} from "../../core/monitoring.service";
import {SharedModule} from "../../shared/shared.module";
import {MockInspectionService, MockMonitoringService} from "../../../test";
import {RouterTestingModule} from "@angular/router/testing";
import {D3Service} from "d3-ng2-service";
import {InspectionService} from "../../core/inspection.service";

describe('InspectionHistoryComponent', () => {
  let component: InspectionHistoryComponent;
  let fixture: ComponentFixture<InspectionHistoryComponent>;

  class MockD3Service {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHistoryComponent ],
      imports: [ SharedModule, RouterTestingModule],
      providers: [
        {provide: MonitoringService, useClass: MockMonitoringService},
        D3Service,
        {provide: InspectionService, useClass: MockInspectionService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
